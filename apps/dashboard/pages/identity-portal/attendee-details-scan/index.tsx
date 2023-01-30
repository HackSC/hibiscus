import { Colors2023 } from '@hibiscus/styles';
import { Text } from '@hibiscus/ui';
import { Button, GlowSpan, Search } from '@hibiscus/ui-kit-2023';
import { SearchUserBox } from '../../../components/identity-portal/search-user-box/search-user-box';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { BiWifi2 } from 'react-icons/bi';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';

export function Index() {
  const router = useRouter();

  return (
    <>
      <div style={{ position: 'absolute', left: '100px' }}>
        <BackButton link="/" />
      </div>

      <ColumnSpacedCenter>
        <GlowSpan
          color={Colors2023.YELLOW.STANDARD}
          style={{ fontSize: '3em' }}
        >
          Attendee Details
        </GlowSpan>

        <FlexRow>
          <div>
            <LabelText>Search by Name</LabelText>
            <SearchUserBox
              onClick={(id) =>
                router.push(`/identity-portal/attendee-details?user_id=${id}`)
              }
            />
          </div>

          <Text>or</Text>

          <div>
            <FlexRowTight>
              <LabelText>Scan Wristband</LabelText>
              <BiWifi2 size={36} style={{ transform: 'rotate(90deg)' }} />
            </FlexRowTight>
            <Search
              placeholder="ID number"
              onInput={(id) =>
                router.push(
                  `/identity-portal/attendee-details?wristband_id=${id}`
                )
              }
            />
          </div>
        </FlexRow>

        <Button color="yellow">SUBMIT</Button>
      </ColumnSpacedCenter>
    </>
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
