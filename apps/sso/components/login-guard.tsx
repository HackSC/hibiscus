import { useState, useEffect, PropsWithChildren } from 'react';
import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';
import * as SSOClient from '@hacksc-platforms/sso-client';

export function LoginGuard({ children }: PropsWithChildren) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const callback = sessionStorage.getItem('callback');
      if (callback != null) {
        try {
          const resToken = await HibiscusSupabaseClient.validateSession();
          if (resToken.status == 200) {
            const res = await SSOClient.ssoCallback(
              callback,
              resToken.data.token
            );
            window.location.replace(res?.redirect ?? '/');
          }
        } catch {
          setAuthorized(true);
        }
      }
    }
    fetchData();
  }, []);

  return authorized && <>{children}</>;
}
