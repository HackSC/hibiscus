import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Modal, Text } from '@hibiscus/ui';
import { ColorSpan, GlowSpan, Search } from '@hibiscus/ui-kit-2023';
import searchEvent from '../../../common/search-event';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ScrollableListBox } from '../../../components/identity-portal/scrollable-list-box/scrollable-list-box';
import { SearchEventBox } from '../../../components/identity-portal/search-event-box/search-event-box';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';

export function Index() {
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [searchRes, setSearchRes] = useState(
    [] as Awaited<ReturnType<typeof searchEvent>>
  );

  async function search(name: string) {
    setSearchRes(await searchEvent(name));

    setModalOpen(true);
  }
  return (
    <>
      <div style={{ position: 'absolute', left: '100px' }}>
        <BackButton link="/" />
      </div>
      <Container>
        <ColumnSpacedCenter>
          <ColumnCenter>
            <GlowSpan
              color={Colors2023.YELLOW.STANDARD}
              style={{ fontSize: '3rem' }}
            >
              Check-in to an Event
            </GlowSpan>
            <Text>Search for your event.</Text>
          </ColumnCenter>
          <SearchEventBox
            onClick={(value) => router.push('/identity-portal')}
          />

          {/* <Search
            placeholder="Search by event name"
            onInput={search}
          ></Search> */}
        </ColumnSpacedCenter>
      </Container>

      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        {searchRes.map((event, i) => (
          <CheckInRow key={i}>
            <BoldText style={{ fontSize: '1rem' }}>{event.name}</BoldText>
            <Text style={{ fontSize: '0.75rem' }}>{event.points}</Text>
          </CheckInRow>
        ))}
      </Modal>
    </>
  );
}

export default Index;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: center;
  justify-items: center;
  min-height: 100%;
`;

const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColumnSpacedCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ColumnSpacedLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CheckInContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 360px;
  height: 385px;

  padding: 1.5rem 2.5rem;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: thick solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 9px;

  overflow-y: scroll;
`;

const CheckInRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: end;

  padding: 1rem 0;

  &:not(:last-child) {
    border-bottom: thin solid ${Colors2023.GRAY.MEDIUM};
  }
`;

// value={''}
// options=
// {searchRes.map((user, i) => (
//     value: {user.name},
//     displayName: {user.name}
// )}
// {[

// {
//   value: 'option-1',
//   displayName: 'option-1',
// },
// {
//   value: 'option-2',
//   displayName: 'option-2',
// },
// {
//   value: 'option-1',
//   displayName: 'option-1',
// },
// {
//   value: 'option-2',
//   displayName: 'option-2',
// },
// {
//   value: 'option-1',
//   displayName: 'option-1',
// },
// {
//   value: 'option-2',
//   displayName: 'option-2',
// },
// {
//   value: 'option-1',
//   displayName: 'option-1',
// },
// {
//   value: 'option-2',
//   displayName: 'option-2',
// }
// ]}
