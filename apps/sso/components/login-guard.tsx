import { useState, useEffect, PropsWithChildren } from 'react';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import * as SSOClient from '@hibiscus/sso-client';
import { container } from 'tsyringe';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';
import { Session } from '@supabase/supabase-js';

interface LoginGuardProps extends PropsWithChildren {
  callback: string;
}

export function LoginGuard({ callback, children }: LoginGuardProps) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (callback != null) {
        const access_token = getCookie(
          getEnv().Hibiscus.Cookies.accessTokenName
        );
        const refresh_token = getCookie(
          getEnv().Hibiscus.Cookies.refreshTokenName
        );
        const supabase = container.resolve(HibiscusSupabaseClient);
        let session: Session | null = null;
        if (access_token != null && refresh_token != null) {
          const { data } = await supabase.verifyToken(
            access_token.toString(),
            refresh_token.toString()
          );
          session = data.session;
        }
        if (session != null) {
          HibiscusSupabaseClient.setTokenCookieClientSide(
            session.access_token,
            session.refresh_token
          );
          const res = await SSOClient.ssoCallback(
            callback,
            session.access_token
          );
          window.location.replace(
            res?.redirect ?? process.env.NEXT_PUBLIC_SSO_DEFAULT_REDIRECT_URL
          );
        } else {
          setAuthorized(true);
        }
      }
    }
    fetchData();
  }, [callback]);

  return authorized && <>{children}</>;
}
