import { useState, useEffect, PropsWithChildren } from 'react';
import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';
import * as SSOClient from '@hacksc-platforms/sso-client';

interface LoginGuardProps extends PropsWithChildren {
  callback: string;
}

export function LoginGuard({ callback, children }: LoginGuardProps) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (callback != null) {
        try {
          const resToken = await HibiscusSupabaseClient.validateSession();
          if (resToken.status == 200) {
            const res = await SSOClient.ssoCallback(
              callback,
              resToken.data.token
            );
            if (res != null && res.redirect != null) {
              window.location.replace(res.redirect);
            } else {
              setAuthorized(true);
            }
          }
        } catch {
          setAuthorized(true);
        }
      }
    }
    fetchData();
  }, [callback]);

  return authorized && <>{children}</>;
}
