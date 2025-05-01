import { useState, useEffect } from 'react';
import useHibiscusUser from 'apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { Colors2023 } from '@hibiscus/styles';
import { BoldText } from '@hibiscus/ui';
import { Text } from '@hibiscus/ui';
import { Checkbox, GlowSpan } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';
import { HibiscusRole } from '@hibiscus/types';
import router from 'next/router';
import { ScrollableListBox } from '../../../components/identity-portal/scrollable-list-box/scrollable-list-box';
import searchEvent from '../../../common/search-event';
import { SearchUserBox } from 'apps/dashboard/components/identity-portal/search-user-box/search-user-box';
// import Select from 'react-select';
import { GrayBox } from 'apps/dashboard/components/gray-box/gray-box';
import { CheckInBox } from 'apps/dashboard/components/identity-portal/check-in-box/check-in-box';
import { DropdownIndicator } from 'react-select/dist/declarations/src/components/indicators';
import DropDown from 'apps/dashboard/components/sponsor-portal/dropdown';
import JudgeSelectionRow from 'apps/dashboard/components/judge-selection/judge-selection-row';
import styles from './GreenButton.module.css';

export function Index() {
  const judge_test = [
    {
      name: 'Judge Name',
      email: 'judgename@gmail.com',
    },
    {
      name: 'Judge Name',
      email: 'judgename@gmail.com',
    },
    {
      name: 'Judge Name',
      email: 'judgename@gmail.com',
    },
    {
      name: 'Judge Name',
      email: 'judgename@gmail.com',
    },
    {
      name: 'Judge Name',
      email: 'judgename@gmail.com',
    },
    {
      name: 'Judge Name',
      email: 'judgename@gmail.com',
    },
  ];

  const { user: authUser } = useHibiscusUser();
  const { supabase } = useHibiscusSupabase();

  //search for all events in supabase table
  const [searchRes, setSearchRes] = useState(null);
  const [selected, setSelected] = useState(null);
  const [checkedItems, setCheckedItems] = useState(
    new Array(judge_test.length).fill(false)
  );
  const [selectAll, setSelectAll] = useState(false);

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

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCheckedItems(new Array(judge_test.length).fill(!selectAll));
  };

  const handleSingleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    setSelectAll(newCheckedItems.every((item) => item));
  };

  return (
    <>
      <div className="flex flex-col px-10 py-5 gap-2">
        <button className="w-[150px] border border-black rounded-[5px] px-[20px] py-[6px] text-base text-white bg-[#429FEE]">
          Invite Judge
        </button>
        <div className="flex justify-between text-xs">
          <Text className="text-[#989898] text-sm">
            Welcome! Invite judges and assign them verticals!
          </Text>
          <div>Search name</div>
        </div>
        {/* Add Select All header */}
        <div className="flex items-center w-full pt-5">
          <div className="flex items-center gap-3 py-2 w-[50%]">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className={`h-5 w-5 accent-[#BAE627] ${styles.checkbox}`}
            />
            <span className="font-medium">
              <em>Select All</em>
            </span>
          </div>
          <span className="font-medium ml-4">
            <em>Vertical</em>
          </span>
        </div>
        <div className="flex flex-col gap-2 justify-stretch">
          <JudgeSelectionRow
            judgeInfo={judge_test}
            checkedItems={checkedItems}
            onCheckChange={handleSingleCheck}
          />
        </div>
      </div>
    </>
  );
}
export default Index;
