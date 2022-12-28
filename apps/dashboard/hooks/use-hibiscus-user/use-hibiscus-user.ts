import { HibiscusRole } from '@hibiscus/types';
import { useState } from 'react';

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
  const [user, setUser] = useState<HibiscusUser>({
    tag: '@vincentvu',
    role: HibiscusRole.ADMIN,
    firstName: 'Vincent',
  });
  return { user, setUser };
}

export default useHibiscusUser;
