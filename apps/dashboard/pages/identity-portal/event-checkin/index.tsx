import { Colors2023 } from '@hibiscus/styles';
import { Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';
import { SearchEventBox } from '../../../components/identity-portal/search-event-box/search-event-box';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';

export function Index() {
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

          <SearchEventBox />
        </ColumnSpacedCenter>
      </Container>
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
