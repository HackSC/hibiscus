import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next/types';
import axios from 'axios';
import { getEnv } from '@hibiscus/env';
import {
  AuthResponse,
  createClient,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';
import { HibiscusRole } from '@hibiscus/types';

const FAKE_USER_EMAIL = 'example@hacksc.com';
const FAKE_USER_PASSWORD = 'hacksc';

/**
 * Generates the NextJS middleware needed to integrate with the Hibiscus SSO system
 * Ensure that a suitable config is also exported in the middleware file such that static files are not blocked
 *
 * @param callbackUrl URL which the SSO will send a POST request to set a cookie on the app
 * @param guardPaths Array of paths (with leading slash) which this middleware will guard
 * @param unauthorizedRredirectUrl URL to redirect unauthorized users to
 * @param exhaustive Whether the middleware should terminate or propagate. Default true (terminate)
 * @returns NextJS middleware function
 */
export const middlewareHandler =
  (
    callbackUrl: string,
    guardPaths?: string[],
    unauthorizedRredirectUrl?: string,
    exhaustive = true
  ) =>
  async (request: NextRequest): Promise<NextResponse | null> => {
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      const res = NextResponse.next();
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      return res;
    }

    let access_token = request.cookies.get(
      getEnv().Hibiscus.Cookies.accessTokenName
    );
    let refresh_token = request.cookies.get(
      getEnv().Hibiscus.Cookies.refreshTokenName
    );

    const access_token_init = access_token;

    if (getEnv().Hibiscus.Cookies.disableSSO === 'true') {
      [access_token, refresh_token] = await initializeFakeUser(
        access_token,
        refresh_token
      );
    }

    guardPaths = guardPaths ?? [''];

    for (const guardPathFull of guardPaths) {
      const guardPath = splitPath(guardPathFull);
      const path = splitPath(request.nextUrl.pathname);

      if (
        guardPath.length <= path.length &&
        checkArrayContainsOrdered(guardPath, path)
      ) {
        if (access_token && refresh_token) {
          const { data } = await verifyToken(access_token, refresh_token);

          if ('session' in data && data.session != null) {
            // Access token might have been refreshed
            access_token = data.session.access_token;
            refresh_token = data.session.refresh_token;
          }

          if (data.user != null) {
            const res = NextResponse.next();
            if (access_token !== access_token_init) {
              // Only set cookies if access token actually changed
              res.cookies.set(
                getEnv().Hibiscus.Cookies.accessTokenName,
                access_token,
                {
                  path: '/',
                  domain: getEnv().Hibiscus.AppURL.baseDomain,
                  maxAge: Number.parseInt(getEnv().Hibiscus.Cookies.maxAge),
                  sameSite: 'lax',
                }
              );
              res.cookies.set(
                getEnv().Hibiscus.Cookies.refreshTokenName,
                refresh_token,
                {
                  path: '/',
                  domain: getEnv().Hibiscus.AppURL.baseDomain,
                  maxAge: Number.parseInt(getEnv().Hibiscus.Cookies.maxAge),
                  sameSite: 'lax',
                }
              );
            }
            return res;
          }
        }

        // Access token not found

        // Redirect to show unauthorized if it is API endpoint
        if (path.length >= 2 && path[1] === 'api') {
          return NextResponse.redirect(
            `${getEnv().Hibiscus.AppURL.sso}/api/unauthorized`
          );
        }

        // Redirect to login
        const redirect = generateRedirectUrl(
          callbackUrl,
          request.nextUrl.pathname,
          unauthorizedRredirectUrl
        );
        return NextResponse.redirect(redirect);
      }
    }

    if (exhaustive) {
      const redirect = generateRedirectUrl(
        callbackUrl,
        request.nextUrl.pathname,
        unauthorizedRredirectUrl
      );
      return NextResponse.redirect(redirect);
    } else {
      return null;
    }
  };

/**
 * Generates a preconfigrued API handler for setting the access token on the app
 *
 * @param redirectUrl URL to redirect the user back to
 * @returns NextJS API handler
 */
export const callbackApiHandler =
  (redirectUrl: string) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    // Handle pre-flight requests
    if (req.method === 'OPTIONS') {
      if (req.headers.origin === getEnv().Hibiscus.AppURL.sso) {
        res.setHeader(
          'Access-Control-Allow-Origin',
          getEnv().Hibiscus.AppURL.sso
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        );
        res.status(200).json({ message: 'Success' });
      } else {
        res.status(400).json({ message: 'Invalid request origin' });
      }
    } else if (req.method === 'POST') {
      const auth_header = req.headers.authorization;
      if (auth_header != null && auth_header.startsWith('Bearer ')) {
        const redirectPath = req.query.redirect;

        res.setHeader(
          'Access-Control-Allow-Origin',
          getEnv().Hibiscus.AppURL.sso
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        );
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.status(200).json({
          message: 'Authorization success',
          redirect: `${redirectUrl}${redirectPath}`,
        });
      } else {
        res.status(400).json({ error: 'Bearer token must be provided' });
      }
    } else {
      res.status(404).json({
        error: `HTTP method ${req.method} not supported on this route`,
      });
    }
  };

const VALID_CALLBACKS = [
  getEnv().Hibiscus.AppURL.ssoMockApp,
  getEnv().Hibiscus.AppURL.portal,
];

/**
 * Calls the app's callback API route which sets the token as a cookie on the app
 *
 * @param callback Callback URL for the app
 * @param access_token Access token obtained from login
 * @returns object containing `redirect` property or `null` if callback URL is not allowed
 */
export async function ssoCallback(callback: string, access_token: string) {
  // callback can === '' (empty string) when no callback is specified
  if (callback == null || callback === '') {
    return null;
  }

  try {
    if (!VALID_CALLBACKS.map(getHost).includes(getHost(callback))) {
      return null;
    }

    const res = await axios.post(
      callback,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch {
    return null;
  }
}

function getHost(url: string): string {
  return new URL(url).host;
}

/**
 * Verifies whether the provided access token is valid or has expired
 * Exact copy of the one in hibiscus-supabase-client
 * We cannot use the one there because it imports reflect-metadata which cannot run on NextJS middleware
 *
 * @param access_token JWT access token associated with a user
 * @param refresh_token Supabase refresh token
 * @returns object containing `data` and `error` properties, either of which may be undefined
 */
async function verifyToken(
  access_token: string,
  refresh_token: string
): Promise<AuthResponse | UserResponse> {
  const supabase = createSupabaseServiceClient();

  // Verify access token
  const userRes = await supabase.auth.getUser(access_token);

  if (userRes.data.user == null) {
    // Refresh the access token if needed
    const authRes = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    return authRes;
  } else {
    return userRes;
  }
}

export async function logout() {
  window.location.replace(`${getEnv().Hibiscus.AppURL.sso}/logout`);
}

function generateRedirectUrl(
  callbackUrl: string,
  path: string,
  redirect?: string
): URL {
  const redirectUrl = new URL(
    redirect ?? `${getEnv().Hibiscus.AppURL.sso}/login`
  );
  redirectUrl.search = `callback=${callbackUrl}${encodeURIComponent(
    `?redirect=${path}`
  )}`;
  return redirectUrl;
}

function checkArrayContainsOrdered<T>(arr1: T[], arr2: T[]): boolean {
  const length = arr1.length <= arr2.length ? arr1.length : arr2.length;
  for (let i = 0; i < length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function splitPath(path: string): string[] {
  const split = path.split('/');
  if (split.length > 0 && split[-1] === '') {
    split.pop();
  }

  return split;
}

async function initializeFakeUser(access_token: string, refresh_token: string) {
  const supabase = createSupabaseServiceClient();

  if (
    access_token == null ||
    refresh_token == null ||
    (await supabase.auth.getUser(access_token)).data.user == null
  ) {
    let {
      data: { user, session },
    } = await supabase.auth.signInWithPassword({
      email: FAKE_USER_EMAIL,
      password: FAKE_USER_PASSWORD,
    });

    if (user == null || session == null) {
      ({
        data: { user },
      } = await supabase.auth.admin.createUser({
        email: FAKE_USER_EMAIL,
        password: FAKE_USER_PASSWORD,
        email_confirm: true,
      }));

      console.log(user);

      if (user != null) {
        ({
          data: { user, session },
        } = await supabase.auth.signInWithPassword({
          email: FAKE_USER_EMAIL,
          password: FAKE_USER_PASSWORD,
        }));
      }
    }

    if (user != null && session != null) {
      await supabase.from('user_profiles').insert({
        user_id: user.id,
        email: user.email,
        first_name: 'Hack',
        last_name: 'SC',
        // Default role = HACKER
        role: Object.keys(HibiscusRole).indexOf(HibiscusRole.HACKER) + 1,
      });

      // request.cookies.set(
      //   getEnv().Hibiscus.Cookies.accessTokenName,
      //   session.access_token,
      //   {
      //     path: '/',
      //     domain: getEnv().Hibiscus.AppURL.baseDomain,
      //     maxAge: Number.parseInt(getEnv().Hibiscus.Cookies.maxAge),
      //     sameSite: 'lax',
      //   }
      // );
      // request.cookies.set(
      //   getEnv().Hibiscus.Cookies.refreshTokenName,
      //   session.refresh_token,
      //   {
      //     path: '/',
      //     domain: getEnv().Hibiscus.AppURL.baseDomain,
      //     maxAge: Number.parseInt(getEnv().Hibiscus.Cookies.maxAge),
      //     sameSite: 'lax',
      //   }
      // );
      return [session.access_token, session.refresh_token];
    }
  }

  return [access_token, refresh_token];
}

function createSupabaseServiceClient(): SupabaseClient {
  return createClient(
    getEnv().Hibiscus.Supabase.apiUrl,
    getEnv().Hibiscus.Supabase.serviceKey
  );
}
