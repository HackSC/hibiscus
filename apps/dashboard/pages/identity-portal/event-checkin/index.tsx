import { Colors2023 } from '@hibiscus/styles';
import { BoldText } from '@hibiscus/ui';
import { Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';
import { HibiscusRole } from '@hibiscus/types';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import router from 'next/router';
import { ScrollableListBox } from '../../../components/identity-portal/scrollable-list-box/scrollable-list-box';
import { useEffect, useState } from 'react';
import searchEvent from '../../../common/search-event';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';

export function Index() {
  const { user: authUser } = useHibiscusUser();
  const { supabase } = useHibiscusSupabase();

  //search for all events in supabase table
  const [searchRes, setSearchRes] = useState(
    [] as Awaited<ReturnType<typeof searchEvent>>
  );

  useEffect(() => {
    search();
  }, []);

  if (authUser == null) {
    return <>Loading</>;
  }
  // Limit access to only volunteer role
  if (authUser?.role !== HibiscusRole.VOLUNTEER) {
    router.push('/');
    return <></>;
  }

  async function search() {
    setSearchRes(await searchEvent(supabase));
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
          <ScrollableListBox width={500}>
            {searchRes.map((event, i) => (
              <ScrollableListBox.ItemClickable
                key={i}
                value={event.id}
                onClick={(id) =>
                  router.push(`/identity-portal/attendee-event-scan?id=${id}`)
                }
              >
                <BoldText style={{ fontSize: '1em' }}>{event.name}</BoldText>
                <Text style={{ fontSize: '0.75em' }}>{event.location}</Text>
                <Text style={{ fontSize: '0.75em' }}>{event.points}</Text>
              </ScrollableListBox.ItemClickable>
            ))}
          </ScrollableListBox>
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
