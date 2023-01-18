import { getEnv } from '@hibiscus/env';
import { middlewareHandler } from '@hibiscus/sso-client';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@hibiscus/sso-client';

export async function middleware(request: NextRequest) {
  // Intercept requests to application page and redirect to signup page if no session detected
  const path = request.nextUrl.pathname.split('/');
  if (path.length >= 2 && path[1] === 'apply-2023') {
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

    // Redirect to signup
    const redirectUrl = new URL(`${getEnv().Hibiscus.AppURL.sso}/signup`);
    redirectUrl.search = `callback=${
      getEnv().Hibiscus.AppURL.portal
    }/api/callback${encodeURIComponent(
      `?redirect=${request.nextUrl.pathname}`
    )}`;
    return NextResponse.redirect(redirectUrl);
  }

  return middlewareHandler(`${getEnv().Hibiscus.AppURL.portal}/api/callback`)(
    request
  );
}

export const config = {
  // This matches everything except for static files
  matcher: ['/((?!_next/static|static|favicon.ico).*)'],
};
