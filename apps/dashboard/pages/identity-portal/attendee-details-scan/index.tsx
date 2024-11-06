import { Colors2023 } from '@hibiscus/styles';
import { Text } from '@hibiscus/ui';
import { GlowSpan, Search } from '@hibiscus/ui-kit-2023';
import { SearchUserBox } from '../../../components/identity-portal/search-user-box/search-user-box';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { BiWifi2 } from 'react-icons/bi';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';
import { HibiscusRole } from '@hibiscus/types';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';

export function Index() {
  const router = useRouter();

  const { user: authUser } = useHibiscusUser();
  if (authUser == null) {
    return <>Loading</>;
  }
  // Limit access to only volunteer role
  if (authUser?.role !== HibiscusRole.VOLUNTEER) {
    router.push('/');
    return <></>;
  }

  return (
    <div className="flex flex-col">
      <p className="mb-[64px]">Search for hackers!</p>

      <div className="flex flex-col gap-[10px]">
        <h2 className="m-0 text-xl text-theme-redward">Search by Name</h2>
        <SearchUserBox
          onClick={(id) =>
            router.push(`/identity-portal/attendee-details?user_id=${id}`)
          }
        />
      </div>

      <p className="my-[30px]">or</p>

      <div className="flex flex-col gap-[10px]">
        <h2 className="m-0 text-xl text-theme-redward">Scan Wristband</h2>
        <Search
          placeholder="ID number"
          onInput={(id) =>
            router.push(`/identity-portal/attendee-details?wristband_id=${id}`)
          }
        />
      </div>
    </div>
  );
}

export default Index;

const ColumnSpacedCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5em;

  min-height: 100%;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5em;
`;

const FlexRowTight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LabelText = styled(Text)`
  color: ${Colors2023.YELLOW.LIGHT};
  font-size: 1.5em;
`;
