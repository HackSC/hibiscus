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
      const res = await fetch(request.nextUrl.searchParams.get('callback'), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      return NextResponse.redirect(
        (await res.json()).redirect ?? process.env.SSO_URL
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login'],
};
