import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Modal, Text } from '@hibiscus/ui';
import { ColorSpan, GlowSpan, Search } from '@hibiscus/ui-kit-2023';
import searchUser from '../../../common/search-user';
import { useState } from 'react';
import styled from 'styled-components';
import { ScrollableListBox } from '../../../components/scrollable-list-box/scrollable-list-box';

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
              style={{ fontSize: '3em' }}
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
          <ScrollableListBox width="360px" height="385px">
            {[...Array(10)].map((_, i) => (
              <ScrollableListBox.Item key={i}>
                <BoldText style={{ fontSize: '1em' }}>Faith Wang</BoldText>
                <Text style={{ fontSize: '0.75em' }}>Checked-in</Text>
              </ScrollableListBox.Item>
            ))}
          </ScrollableListBox>
        </ColumnSpacedLeft>
      </Container>

      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        {searchRes.map((user, i) => (
          <ScrollableListBox.Item key={i}>
            <BoldText style={{ fontSize: '1em' }}>
              {user.first_name} {user.last_name}
            </BoldText>
            <Text style={{ fontSize: '0.75em' }}>{user.email}</Text>
          </ScrollableListBox.Item>
        ))}
      </Modal>
    </>
  );
}

export default Index;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
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
  gap: 1.5em;
`;

const ColumnSpacedLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;
