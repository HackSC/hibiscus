import { HibiscusRole, HibiscusUser } from '@hibiscus/types';
import { getCookie } from 'cookies-next';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getEnv } from '@hibiscus/env';
import { useAppDispatch } from '../redux/hooks';
import { removeTabRoute } from '../../store/menu-slice';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApplicationStatus } from 'libs/types/src/lib/application-status';
import { isHackerPostAppStatus } from '../../common/utils';
import React from 'react';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';

const HibiscusUserContext = React.createContext<{
  user: HibiscusUser | null;
  setUser: Dispatch<SetStateAction<HibiscusUser>> | null;
}>({
  user: null,
  setUser: null,
});

const getUserProfile = async (
  accessToken: string,
  refreshToken: string,
  supabase: HibiscusSupabaseClient
): Promise<HibiscusUser> => {
  // Get user profile from db
  // uses cookie set from SSO
  const profile = await supabase.getUserProfile(accessToken, refreshToken);

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
      attendanceConfirmed: profile.attendance_confirmed,
    };
  } else {
    // Set user's name and tag to be their email as temporary placeholder
    // Assume we only show dashboard when user is logged in
    const user = await supabase.getClient().auth.getUser(accessToken);
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

export const HibiscusUserProvider = (props: React.PropsWithChildren) => {
  const [user, setUser] = useState<HibiscusUser | null>(null);
  const { supabase } = useHibiscusSupabase();

  const accessToken = getCookie(
    getEnv().Hibiscus.Cookies.accessTokenName
  ) as string;
  const refreshToken = getCookie(
    getEnv().Hibiscus.Cookies.refreshTokenName
  ) as string;

  // fetch it on initial load in
  useEffect(() => {
    getUserProfile(accessToken, refreshToken, supabase).then((u) => {
      setUser(u);
    });
  }, [accessToken, refreshToken]);

  return (
    <HibiscusUserContext.Provider value={{ user, setUser }}>
      {props.children}
    </HibiscusUserContext.Provider>
  );
};

export function useHibiscusUser() {
  const { user, setUser } = useContext(HibiscusUserContext);
  const dispatch = useAppDispatch();

  const updateUser = (update: Partial<HibiscusUser>) => {
    setUser((prev) => ({
      ...prev,
      ...update,
    }));
  };

  // remove hackform from menu if applied
  useEffect(() => {
    if (isHackerPostAppStatus(user?.applicationStatus)) {
      dispatch(removeTabRoute('/apply-2023-x'));
    }
  }, [dispatch, user?.applicationStatus]);

  return { user, setUser, getUserProfile, updateUser };
}

export default useHibiscusUser;
