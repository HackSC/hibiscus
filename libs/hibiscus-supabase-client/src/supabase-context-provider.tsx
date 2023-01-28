import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { HibiscusSupabaseClient } from './supabase-client';
import { logout } from '@hibiscus/sso-client';
import { container } from 'tsyringe';

const supabase = container.resolve(HibiscusSupabaseClient);

export const SupabaseContext = createContext({
  supabase,
});

export function SupabaseContextProvider(props: PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function setSession() {
      supabase.setSessionClientSide();

      // We assume the user must be logged in or else they would have been
      // redirected by the middleware
      supabase.getClient().auth.onAuthStateChange((event, session) => {
        if (event == 'TOKEN_REFRESHED') {
          if (session != null) {
            HibiscusSupabaseClient.setTokenCookieClientSide(
              session.access_token,
              session.refresh_token
            );
          } else {
            console.error('Token refresh failed');
            logout();
          }
        }
      });

      setInitialized(true);
    }

    setSession();
  }, []);

  if (!initialized) {
    return <></>;
  }

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {props.children}
    </SupabaseContext.Provider>
  );
}
