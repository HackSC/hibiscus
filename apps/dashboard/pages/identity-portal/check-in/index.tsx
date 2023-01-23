import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Modal, Text } from '@hibiscus/ui';
import { ColorSpan, GlowSpan, Search } from '@hibiscus/ui-kit-2023';
import searchUser from '../../../common/search-user';
import { useState } from 'react';
import styled from 'styled-components';

export function Index() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchRes, setSearchRes] = useState(
    [] as Awaited<ReturnType<typeof searchUser>>
  );

  async function search(name: string) {
    setSearchRes(await searchUser(name));

    setModalOpen(true);
  }

  return (
    <>
      <Container>
        <ColumnSpacedCenter>
          <ColumnCenter>
            <GlowSpan
              color={Colors2023.YELLOW.STANDARD}
              style={{ fontSize: '3rem' }}
            >
              Check-in
            </GlowSpan>
            <Text>Assign wristband.</Text>
          </ColumnCenter>
          <ColorSpan color={Colors2023.YELLOW.LIGHT}>Search by Name</ColorSpan>
          <Search
            placeholder="Search by attendee name"
            onInput={search}
          ></Search>
        </ColumnSpacedCenter>

        <ColumnSpacedLeft>
          <Text>Recent check-ins</Text>
          <CheckInContainer>
            {[...Array(10)].map((_, i) => (
              <CheckInRow key={i}>
                <BoldText style={{ fontSize: '1rem' }}>Faith Wang</BoldText>
                <Text style={{ fontSize: '0.75rem' }}>Checked-in</Text>
              </CheckInRow>
            ))}
          </CheckInContainer>
        </ColumnSpacedLeft>
      </Container>

      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        {searchRes.map((user, i) => (
          <CheckInRow key={i}>
            <BoldText style={{ fontSize: '1rem' }}>
              {user.first_name} {user.last_name}
            </BoldText>
            <Text style={{ fontSize: '0.75rem' }}>{user.email}</Text>
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
