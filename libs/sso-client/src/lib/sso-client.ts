import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next/types';
import axios from 'axios';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { getEnv } from '@hibiscus/env';
import { getCookie } from 'cookies-next';

/**
 * Generates the NextJS middleware needed to integrate with the Hibiscus SSO system
 * Ensure that a suitable config is also exported in the middleware file such that static files are not blocked
 *
 * @param callbackUrl URL which the SSO will send a POST request to set a cookie on the app
 * @returns NextJS middleware function
 */
export const middlewareHandler =
  (callbackUrl: string) => async (request: NextRequest) => {
    // Guard API route
    const path = request.nextUrl.pathname.split('/');
    if (path.length >= 2 && path[1] === 'api') {
      if (
        request.method !== 'GET' &&
        request.headers.get('origin') === process.env.NEXT_PUBLIC_SSO_URL
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    if (
      request.cookies.has(process.env.NEXT_PUBLIC_HIBISCUS_ACCESS_COOKIE_NAME)
    ) {
      const access_token = request.cookies.get(
        process.env.NEXT_PUBLIC_HIBISCUS_ACCESS_COOKIE_NAME
      );
      const refresh_token = request.cookies.get(
        process.env.NEXT_PUBLIC_HIBISCUS_REFRESH_COOKIE_NAME
      );
      const { data } = await verifyToken(access_token, refresh_token);

      if (data != null) {
        if (data.session != null) {
          const res = NextResponse.next();
          res.cookies.set(
            process.env.NEXT_PUBLIC_HIBISCUS_ACCESS_COOKIE_NAME,
            data.session.access_token,
            {
              path: '/',
              domain: process.env.NEXT_PUBLIC_HIBISCUS_DOMAIN,
              maxAge: Number.parseInt(
                process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_MAX_AGE
              ),
              sameSite: 'lax',
            }
          );
          res.cookies.set(
            process.env.NEXT_PUBLIC_HIBISCUS_REFRESH_COOKIE_NAME,
            data.session.refresh_token,
            {
              path: '/',
              domain: process.env.NEXT_PUBLIC_HIBISCUS_DOMAIN,
              maxAge: Number.parseInt(
                process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_MAX_AGE
              ),
              sameSite: 'lax',
            }
          );
          return res;
        } else if (data.user != null) {
          return NextResponse.next();
        }
      }
    }

    const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_SSO_URL}/login`);
    redirectUrl.search = `callback=${callbackUrl}`;
    return NextResponse.redirect(redirectUrl);
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
      if (req.headers.origin === process.env.NEXT_PUBLIC_SSO_URL) {
        res.setHeader(
          'Access-Control-Allow-Origin',
          process.env.NEXT_PUBLIC_SSO_URL
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
        res.setHeader(
          'Access-Control-Allow-Origin',
          process.env.NEXT_PUBLIC_SSO_URL
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        );
        res.status(200).json({
          message: 'Authorization success',
          redirect: redirectUrl,
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
  process.env.NEXT_PUBLIC_SSO_MOCK_APP_URL,
  process.env.NEXT_PUBLIC_PORTAL_URL,
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
async function verifyToken(access_token: string, refresh_token: string) {
  // The Fetch API is used instead of axios because this function needs to be used in
  // NextJS middleware and their edge functions do not support axios
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SSO_URL}/api/verifyToken`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token, refresh_token }),
    }
  );
  const data = await res.json();
  return data;
}

export async function logout() {
  window.location.replace(`${process.env.NEXT_PUBLIC_SSO_URL}/logout`);
}

/**
 * Sets the Supabase auth session on client side for situations that require it
 * e.g. adhere to RLS during database access, reset password
 *
 * @param supabase optional
 * @param access_token optional
 * @param refresh_token optional
 */
export async function setSessionClientSide(
  supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL,
    process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_ANON_KEY
  ),
  access_token: string = getCookie(
    getEnv().Hibiscus.Cookies.accessTokenName
  ) as string,
  refresh_token: string = getCookie(
    getEnv().Hibiscus.Cookies.refreshTokenName
  ) as string
) {
  const sessionRes = await supabase.auth.getSession();
  if ('session' in sessionRes.data && sessionRes.data.session != null) {
    // Update cookies in case session was refreshed
    HibiscusSupabaseClient.setTokenCookieClientSide(
      sessionRes.data.session.access_token,
      sessionRes.data.session.refresh_token
    );
    return;
  }

  // Else no session was found in current context
  const authRes = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if ('session' in authRes.data && authRes.data.session != null) {
    // Update cookies in case session was refreshed
    HibiscusSupabaseClient.setTokenCookieClientSide(
      authRes.data.session.access_token,
      authRes.data.session.refresh_token
    );
  }
}
