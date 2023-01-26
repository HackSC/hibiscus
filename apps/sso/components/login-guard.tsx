import { useState, useEffect, PropsWithChildren, useContext } from 'react';
import {
  HibiscusSupabaseClient,
  SupabaseContext,
} from '@hibiscus/hibiscus-supabase-client';
import * as SSOClient from '@hibiscus/sso-client';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';
import { Session } from '@supabase/supabase-js';

interface LoginGuardProps extends PropsWithChildren {
  callback: string;
}

export function LoginGuard({ callback, children }: LoginGuardProps) {
  const [authorized, setAuthorized] = useState(false);
  const { supabase } = useContext(SupabaseContext);

  useEffect(() => {
    async function fetchData() {
      if (callback != null) {
        const access_token = getCookie(
          getEnv().Hibiscus.Cookies.accessTokenName
        );
        const refresh_token = getCookie(
          getEnv().Hibiscus.Cookies.refreshTokenName
        );
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
