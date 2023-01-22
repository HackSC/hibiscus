import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { HibiscusRole, HibiscusUser } from '@hibiscus/types';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { container } from 'tsyringe';
import { getEnv } from '@hibiscus/env';
import { useAppDispatch } from '../redux/hooks';
import { removeTabRoute } from '../../store/menu-slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApplicationStatus } from 'libs/types/src/lib/application-status';

export function useHibiscusUser() {
  const [user, setUser] = useState<HibiscusUser | null>(null);
  const dispatch = useAppDispatch();

  const getUserProfile = async (): Promise<HibiscusUser> => {
    const env = getEnv();

    // Get user profile from db
    // uses cookie set from SSO
    const supabase = container.resolve(HibiscusSupabaseClient);
    const profile = await supabase.getUserProfile(
      getCookie(env.Hibiscus.Cookies.accessTokenName) as string,
      getCookie(env.Hibiscus.Cookies.refreshTokenName) as string
    );

    if (profile != null) {
      return {
        id: profile.user_id,
        tag: `${profile.first_name} ${profile.last_name}`,
        role: Object.values(HibiscusRole)[profile.role - 1],
        firstName: profile.first_name,
        lastName: profile.last_name,
        applicationId: profile.app_id,
        applicationStatus:
          Object.values(ApplicationStatus)[profile.application_status - 1],
        teamId: profile.team_id,
      };
    } else {
      // Set user's name and tag to be their email as temporary placeholder
      // Assume we only show dashboard when user is logged in
      const user = await supabase
        .getClient()
        .auth.getUser(
          getCookie(env.Hibiscus.Cookies.accessTokenName) as string
        );
      return {
        id: user.data.user.id,
        tag: user.data.user.email,
        role: HibiscusRole.HACKER,
        firstName: user.data.user.email,
        lastName: null,
        applicationId: null,
        applicationStatus: null,
      };
    }
  };

  useEffect(() => {
    getUserProfile().then((u) => {
      setUser(u);
    });
  }, []);

  // remove hackform from menu if applied
  useEffect(() => {
    if (user?.applicationId) {
      dispatch(removeTabRoute('/apply-2023'));
    }
  }, [dispatch, user?.applicationId]);

  return { user, setUser, getUserProfile };
}

export default useHibiscusUser;
