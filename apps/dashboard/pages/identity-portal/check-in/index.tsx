import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Text } from '@hibiscus/ui';
import { ColorSpan, GlowSpan } from '@hibiscus/ui-kit-2023';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ScrollableListBox } from '../../../components/identity-portal/scrollable-list-box/scrollable-list-box';
import { SearchUserBox } from '../../../components/identity-portal/search-user-box/search-user-box';

export function Index() {
  const router = useRouter();

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
          <SearchUserBox onClick={(value) => router.push('/identity-portal')} />
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
