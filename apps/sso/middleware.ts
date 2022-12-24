import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REGISTERED_PATHS = new Set([
  'login',
  'reset',
  'reset-email',
  'signup',
  'verify',
]);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.split('/');
  if (path.length >= 2 && path[1] === 'api' && request.method !== 'GET') {
    return NextResponse.next();
  } else if (path.length === 2 && REGISTERED_PATHS.has(path[1])) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|static|favicon.ico).*)',
  ],
};
