import { getEnv } from '@hibiscus/env';
import { middlewareHandler } from '@hibiscus/sso-client';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Handle unprotected API routes
  const path = request.nextUrl.pathname.split('/');
  if (path.length >= 2 && path[1] === 'api') {
    // if (path.length >= 3 && path[2] === 'schools') {
    return NextResponse.next();
    // }
  }

  return middlewareHandler(`${getEnv().Hibiscus.AppURL.portal}/api/callback`)(
    request
  );
}

export const config = {
  // This matches everything except for static files
  matcher: ['/((?!_next/static|static|favicon.ico).*)'],
};
