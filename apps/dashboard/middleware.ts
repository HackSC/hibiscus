import { getEnv } from '@hibiscus/env';
import { middlewareHandler } from '@hibiscus/sso-client';
import { NextRequest, NextResponse } from 'next/server';
import { TSRV_RELEASE_FLAG } from './common/constants';

export async function middleware(request: NextRequest) {
  // Intercept requests to application page and redirect to signup page if no session detected

  const res = await middlewareHandler(
    `${getEnv().Hibiscus.AppURL.portal}/api/callback`,
    ['/apply-2023'],
    `${getEnv().Hibiscus.AppURL.sso}/signup`,
    false
  )(request);

  const regTeamAPIs = /\/api\/(team|organizer)/g;
  if (regTeamAPIs.test(request.nextUrl.pathname) && !TSRV_RELEASE_FLAG) {
    return NextResponse.redirect(
      `${getEnv().Hibiscus.AppURL.sso}/api/unauthorized`
    );
  }

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
