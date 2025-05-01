import { useState, useEffect } from 'react';
import useHibiscusUser from 'apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { Colors2023 } from '@hibiscus/styles';
import { BoldText } from '@hibiscus/ui';
import { Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';
import { HibiscusRole } from '@hibiscus/types';
import router from 'next/router';
import { ScrollableListBox } from '../../../components/identity-portal/scrollable-list-box/scrollable-list-box';
import searchEvent from '../../../common/search-event';
import { SearchUserBox } from 'apps/dashboard/components/identity-portal/search-user-box/search-user-box';
// import Select from 'react-select';

export function Index() {
  const { user: authUser } = useHibiscusUser();
  const { supabase } = useHibiscusSupabase();

  //search for all events in supabase table
  const [searchRes, setSearchRes] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    search();
  }, []);

  if (authUser == null) {
    return <>Loading</>;
  }
  // Limit access to judge role
  if (
    authUser?.role !== HibiscusRole.JUDGE &&
    authUser?.role !== HibiscusRole.ADMIN
  ) {
    router.push('/');
    return <></>;
  }

  async function search() {
    setSearchRes(await searchEvent(supabase));
  }

  return (
    <>
      <div>Rankings</div>
    </>
  );
}
export default Index;
