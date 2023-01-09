import { getEnv } from '@hibiscus/env';
import { middlewareHandler } from '@hibiscus/sso-client';

export const middleware = middlewareHandler(
  `${getEnv().Hibiscus.AppURL.portal}/api/callback`
);

export const config = {
  // This matches everything except for static files
  matcher: ['/((?!_next/static|static|favicon.ico).*)'],
};
