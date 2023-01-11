import { getEnv } from '@hibiscus/env';
import { middlewareHandler } from '@hibiscus/sso-client';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Allow access for API routes (we assume these implement protections by itself)
  const reg = /\/api\//g;
  if (request.nextUrl.pathname.match(reg)?.length > 0) {
    return NextResponse.next();
  }

  return middlewareHandler(`${getEnv().Hibiscus.AppURL.portal}/api/callback`)(
    request
  );
}

export const config = {
  // This matches everything except for static files
  matcher: ['/((?!_next/static|static|favicon.ico).*)'],
};
