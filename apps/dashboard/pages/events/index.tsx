import styled from 'styled-components';
import EventsCalendar from '../../components/events/events-calendar';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import { Modal, Text } from '@hibiscus/ui';
import BattlepassPointsBar from '../../components/battlepass/battlepass-points-bar';
import {
  BATTLEPASS_LEVEL_POINTS,
  BattlepassProgress,
  calculateBattlepassProgress,
} from '../../common/calculate-battlepass-progress';
import {
  BattlepassAPIProvider,
  useBattlepassAPI,
} from '../../hooks/use-battlepass-api/use-battlepass-api';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { useEffect, useState } from 'react';
import PinnedEvents from '../../components/events/pinned-events';
import {
  Event,
  getAllEvents,
  getPinnedEvents,
} from '../../common/events.utils';
import EventDetails from '../../components/events/event-details';
import { HibiscusRole } from '@hibiscus/types';

export function Index() {
  return (
    <BattlepassAPIProvider mock={false}>
      <EventPage />
    </BattlepassAPIProvider>
  );
}

function EventPage() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [pinnedEvents, setPinnedEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shouldRefresh, setRefresh] = useState(false);

  // Modal state
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  // Battlepass React hooks
  const battlepassAPI = useBattlepassAPI();
  const { user } = useHibiscusUser();
  const [bpProg, setBattlepassProgress] = useState<BattlepassProgress | null>(
    null
  );
  const [userPoints, setUserPoints] = useState<number | null>(null);

  function refresh() {
    setRefresh(!shouldRefresh);
  }

  // Battlepass calculations
  useEffect(() => {
    battlepassAPI.getUserTotalPoints(user.id).then((res) => {
      const bpp = calculateBattlepassProgress(res.data.points);
      setUserPoints(res.data.points);
      setBattlepassProgress(bpp);
    });
  }, []);

  // Get events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await getAllEvents();
        setEvents(events);
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    }

    fetchEvents();
  }, [shouldRefresh]);

  // Get pinned events
  useEffect(() => {
    async function fetchPinnedEvents() {
      try {
        const pinnedEvents = await getPinnedEvents(user.id);
        setPinnedEvents(pinnedEvents);
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    }

    fetchPinnedEvents();
  }, [user.id, shouldRefresh]);

  return (
    <>
      <Container>
        <GlowSpan color={Colors2023.BLUE.LIGHT} style={{ fontSize: '3rem' }}>
          Events
        </GlowSpan>
        <Text style={{ color: Colors2023.GRAY.SCHEMDIUM }}>
          Let&apos;s build your HackSC schedule!
        </Text>

        <EventsContainer>
          <EventsCalendar
            events={events}
            openModal={(eventId) => setActiveEvent(eventId)}
          />
          <EventsColumn>
            <Text style={{ fontSize: '1.5rem' }}>Your Points</Text>
            {bpProg && (
              <BattlepassPointsBar
                rangeMinPoint={bpProg.level}
                rangeMaxPoint={bpProg.nextLevel}
                currentPoint={userPoints}
                minLabel={
                  <Text>
                    Current points: <GlowSpan>{userPoints}</GlowSpan>
                  </Text>
                }
                maxLabel={
                  BATTLEPASS_LEVEL_POINTS[bpProg.level] <
                  BATTLEPASS_LEVEL_POINTS[3] ? (
                    <Text>
                      Next level points:{' '}
                      <GlowSpan color={Colors2023.BLUE.STANDARD}>
                        {bpProg.nextLevel}
                      </GlowSpan>
                    </Text>
                  ) : null
                }
              />
            )}
            <Text style={{ fontSize: '1.5rem' }}>Your Events</Text>
            <PinnedEvents
              events={pinnedEvents}
              openModal={(eventId) => setActiveEvent(eventId)}
            />
          </EventsColumn>
        </EventsContainer>
      </Container>

      <Modal
        isOpen={activeEvent !== null && activeEvent !== undefined}
        closeModal={() => setActiveEvent(null)}
      >
        {activeEvent !== null && activeEvent !== undefined && (
          <EventDetails
            event={events.find((e) => e.eventId === activeEvent)}
            userId={user.id}
            pinnedEvents={pinnedEvents}
            setError={setError}
            setPinnedEvents={setPinnedEvents}
            refresh={refresh}
            admin={user.role === HibiscusRole.ADMIN}
          />
        )}
      </Modal>
    </>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
`;

const EventsColumn = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`;
