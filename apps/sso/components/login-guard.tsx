import { useState, useEffect, PropsWithChildren } from 'react';
import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';

export interface LoginGuardProps extends PropsWithChildren {
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
            const res = await HibiscusSupabaseClient.ssoCallback(
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
  }, [callback]);

  return authorized && <>{children}</>;
}
