import { useState, useEffect } from "react";
import useHibiscusUser from "apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user";
import { useHibiscusSupabase } from "@hibiscus/hibiscus-supabase-context";
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

export function Index () {
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
    authUser?.role !== HibiscusRole.JUDGE
  ) {
    router.push('/');
    return <></>;
  }

  async function search() {
    setSearchRes(await searchEvent(supabase));
  }



    return(
        <>
        <div className="flex flex-container row p-2 align-items-center justify-items-center">
        <h3 className="col-1 text-xl m-0">Projects</h3>
        {/* <NewProjectButton className="col-1"onClick={() => console.log("project button clicked")}>New Project</NewProjectButton>
        </div>
        <p className="text-muted">Upload and edit projects!</p>
        <div className="row border-gray-100">
        <NewProjectButton className="col-1"onClick={() => console.log("project button clicked")}>All</NewProjectButton> */}

        </div>
        
        </>
    );

}
export default Index;

const NewProjectButton = styled.button`
  padding: 10px 25px;
  margin-top: 0;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  z-index: 2;
  cursor: pointer;
  margin-bottom: 13px;
`;