import React from 'react';
import useHibiscusUser from 'apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user';

export function Index() {
  const { user } = useHibiscusUser();
  if (user == null) {
    return <>Loading</>;
  }
}
