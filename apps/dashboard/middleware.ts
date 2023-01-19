import { getEnv } from '@hibiscus/env';
import { middlewareHandler } from '@hibiscus/sso-client';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Intercept requests to application page and redirect to signup page if no session detected
  const res = await middlewareHandler(
    `${getEnv().Hibiscus.AppURL.portal}/api/callback`,
    ['/apply-2023'],
    `${getEnv().Hibiscus.AppURL.sso}/signup`,
    false
  )(request);

  return (
    res ??
    middlewareHandler(`${getEnv().Hibiscus.AppURL.portal}/api/callback`)(
      request
    )
  );
}

export const config = {
  // This matches everything except for static files
  matcher: ['/((?!_next/static|static|favicon.ico).*)'],
};
