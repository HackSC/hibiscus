import { middlewareHandler } from '@hibiscus/sso-client';

export const middleware = middlewareHandler(process.env.NEXT_PUBLIC_PORTAL_URL);

export const config = {
  // This matches everything except for static files
  matcher: ['/((?!_next/static|static|favicon.ico).*)'],
};
