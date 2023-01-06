import { useState, useEffect, PropsWithChildren } from 'react';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import * as SSOClient from '@hibiscus/sso-client';
import { container } from 'tsyringe';

interface LoginGuardProps extends PropsWithChildren {
  callback: string;
}

export function LoginGuard({ callback, children }: LoginGuardProps) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (callback != null) {
        const supabase = container.resolve(HibiscusSupabaseClient);
        const data = await supabase.validateSession();
        if (data != null) {
          HibiscusSupabaseClient.setTokenCookieClientSide(data.token);
          const res = await SSOClient.ssoCallback(callback, data.token);
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
