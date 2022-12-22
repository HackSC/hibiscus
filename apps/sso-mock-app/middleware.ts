import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.cookies.has(process.env.HIBISCUS_COOKIE_NAME)) {
    const token = request.cookies.get(process.env.HIBISCUS_COOKIE_NAME);
    const res = await fetch(`${process.env.SSO_URL}/api/verifyToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    const { data } = await res.json();

    if (data.user != null) {
      return NextResponse.next();
    }
  }

  const redirectUrl = new URL(`${process.env.SSO_URL}/login`);
  redirectUrl.search = `callback=${process.env.SSO_MOCK_APP_URL}/api/callback`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
