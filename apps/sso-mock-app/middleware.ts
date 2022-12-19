import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.cookies.has(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME)) {
    const token = request.cookies.get(
      process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME
    );
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
  redirectUrl.search = `backlink=${request.url}`;
  return NextResponse.redirect(redirectUrl);
}
