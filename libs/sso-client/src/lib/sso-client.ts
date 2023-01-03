import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next/types';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';

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
        request.headers.get('origin') === process.env.SSO_URL
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    if (request.cookies.has(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME)) {
      const token = request.cookies.get(
        process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME
      );
      const { data } = await verifyToken(token);

      if (data != null && data.user != null) {
        return NextResponse.next();
      }
    }

    const redirectUrl = new URL(`${process.env.SSO_URL}/login`);
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
      if (req.headers.origin === process.env.SSO_URL) {
        res.setHeader('Access-Control-Allow-Origin', process.env.SSO_URL);
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        );
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.status(200).json({ message: 'Success' });
      } else {
        res.status(400).json({ message: 'Invalid request origin' });
      }
    } else if (req.method === 'POST') {
      const auth_header = req.headers.authorization;
      if (auth_header != null && auth_header.startsWith('Bearer ')) {
        const token = auth_header.substring('Bearer '.length);

        res.setHeader('Access-Control-Allow-Origin', process.env.SSO_URL);
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        );
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');
        res.setHeader(
          'Set-Cookie',
          `${process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME}=${token}; Path=/; Max-Age=${process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_MAX_AGE}`
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

/**
 * Calls the app's callback API route which sets the token as a cookie on the app
 *
 * @param callback Callback URL for the app
 * @param token Access token obtained from login
 * @returns object containing `data` property
 */
export async function ssoCallback(callback: string, token: string) {
  const res = await axios.post(
    callback,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  return res.data;
}

/**
 * Verifies whether the provided access token is valid or has expired
 * Exact copy of the one in hibiscus-supabase-client
 * We cannot use the one there because it imports reflect-metadata which cannot run on NextJS middleware
 *
 * @param token JWT access token associated with a user
 * @returns object containing `data` and `error` properties, either of which may be undefined
 */
async function verifyToken(token: string) {
  // The Fetch API is used instead of axios because this function needs to be used in
  // NextJS middleware and their edge functions do not support axios
  const res = await fetch(`${process.env.SSO_URL}/api/verifyToken`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  const data = await res.json();
  return data;
}

export async function logout() {
  deleteCookie(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME);

  window.location.replace(`${process.env.NEXT_PUBLIC_SSO_URL}/logout`);
}
