import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.cookies.has(process.env.HIBISCUS_COOKIE_NAME)) {
    // const cookie = request.cookies.get(process.env.HIBISCUS_COOKIE_NAME);

    return NextResponse.next();
  }

  const redirectUrl = new URL('http://localhost:4200/login');
  redirectUrl.search = `backlink=${request.url}`;
  return NextResponse.redirect(redirectUrl);
}
