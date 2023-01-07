import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { HibiscusRole } from '@hibiscus/types';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { container } from 'tsyringe';

interface HibiscusUser {
  tag: string;
  role: HibiscusRole;
  firstName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseHibiscusUser {
  user: HibiscusUser;
  setUser: (user: HibiscusUser) => void;
}

export function useHibiscusUser(): UseHibiscusUser {
  const [user, setUser] = useState<HibiscusUser>(null);

  async function getUserProfile() {
    // Get user profile from db
    const supabase = container.resolve(HibiscusSupabaseClient);
    const profile = await supabase.getUserProfile(
      getCookie(process.env.NEXT_PUBLIC_HIBISCUS_ACCESS_COOKIE_NAME) as string,
      getCookie(process.env.NEXT_PUBLIC_HIBISCUS_REFRESH_COOKIE_NAME) as string
    );

    if (profile != null) {
      setUser({
        tag: `${profile.first_name} ${profile.last_name}`,
        role: Object.values(HibiscusRole)[profile.role],
        firstName: profile.first_name,
      });
    } else {
      // Set user's name and tag to be their email as temporary placeholder
      // Assume we only show dashboard when user is logged in
      const user = await supabase
        .getClient()
        .auth.getUser(
          getCookie(
            process.env.NEXT_PUBLIC_HIBISCUS_ACCESS_COOKIE_NAME
          ) as string
        );
      setUser({
        tag: user.data.user.email,
        role: HibiscusRole.HACKER,
        firstName: user.data.user.email,
      });
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return { user, setUser };
}

export default useHibiscusUser;
