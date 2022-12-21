import { useState, useEffect, PropsWithChildren } from 'react';
import axios from 'axios';

export interface LoginGuardProps extends PropsWithChildren {
  callback: string;
}

export function LoginGuard({ callback, children }: LoginGuardProps) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (callback != null) {
        try {
          const resToken = await axios.post('/api/validateSession', {});
          const res = await axios.post(
            callback,
            {},
            {
              headers: {
                Authorization: `Bearer ${resToken.data.token}`,
              },
              withCredentials: true,
            }
          );
          window.location.replace(res.data?.redirect ?? '/');
        } catch {
          setAuthorized(true);
        }
      }
    }
    fetchData();
  }, [callback]);

  return authorized && <>{children}</>;
}
