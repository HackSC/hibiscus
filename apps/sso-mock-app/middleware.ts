import { middlewareHandler } from '@hibiscus/sso-client';

export const middleware = middlewareHandler(
  `${process.env.NEXT_PUBLIC_SSO_MOCK_APP_URL}/api/callback`
);

export const config = {
  matcher: ['/((?!_next/static|static|favicon.ico).*)'],
};
