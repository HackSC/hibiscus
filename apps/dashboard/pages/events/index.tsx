import styled from 'styled-components';
import EventsCalendar from '../../components/events/events-calendar';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
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
  isSameDate,
} from '../../common/events.utils';
import EventDetails from '../../components/events/event-details';
import { HibiscusRole } from '@hibiscus/types';
import { useMediaQuery } from 'react-responsive';
import EventList, { EventListType } from '../../components/events/event-list';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';

export function Index() {
  return (
    <BattlepassAPIProvider mock={false}>
      <EventPage />
    </BattlepassAPIProvider>
  );
}

function EventPage() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [eventsGrouped, setEventsGrouped] = useState<Event[][] | null>(null);
  const [pinnedEvents, setPinnedEvents] = useState<Event[] | null>(null);
  const [pinnedEventsGrouped, setPinnedEventsGrouped] = useState<
    Event[][] | null
  >(null);
  const [mobileView, setMobileView] = useState(EventListType.ALL_EVENTS);
  const [error, setError] = useState<string | null>(null);
  const [shouldRefresh, setRefresh] = useState(false);

  // Modal state
  const [activeEvent, setActiveEvent] = useState<string | null>(null);

  // Battlepass React hooks
  const battlepassAPI = useBattlepassAPI();
  const { user } = useHibiscusUser();
  const [bpProg, setBattlepassProgress] = useState<BattlepassProgress | null>(
    null
  );
  const [userPoints, setUserPoints] = useState<number | null>(null);

  // Media query hook
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

  function refresh() {
    setRefresh(!shouldRefresh);
  }

  function toggleMobileView() {
    if (mobileView === EventListType.ALL_EVENTS) {
      setMobileView(EventListType.PINNED_EVENTS);
    } else {
      setMobileView(EventListType.ALL_EVENTS);
    }
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
        const events = await getAllEvents(
          getCookie(getEnv().Hibiscus.Cookies.accessTokenName)?.toString()
        );
        setEvents(events);

        // Group events by date
        const eventsByDate: Event[][] = [];
        for (const e of events) {
          if (
            eventsByDate.length === 0 ||
            !isSameDate(eventsByDate.at(-1)[0].startTime, e.startTime)
          ) {
            eventsByDate.push([e]);
          } else {
            eventsByDate.at(-1).push(e);
          }
        }
        setEventsGrouped(eventsByDate);
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
        const pinnedEvents = await getPinnedEvents(
          user.id,
          getCookie(getEnv().Hibiscus.Cookies.accessTokenName)?.toString()
        );
        setPinnedEvents(pinnedEvents);
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    }
    fetchPinnedEvents();
  }, [user.id, shouldRefresh]);

  useEffect(() => {
    if (pinnedEvents && eventsGrouped) {
      // Group events by date
      const eventsByDate: Event[][] = [];
      let column = 0;
      for (const e of pinnedEvents) {
        while (!isSameDate(e.startTime, eventsGrouped[column][0].startTime)) {
          if (eventsByDate.length <= column) {
            eventsByDate.push([]);
          }
          column++;
        }

        if (eventsByDate.length <= column) {
          eventsByDate.push([e]);
        } else {
          eventsByDate.at(-1).push(e);
        }
      }
      setPinnedEventsGrouped(eventsByDate);
    }
  }, [pinnedEvents, eventsGrouped]);

  return (
    <>
      <Container>
        <GlowSpan color={Colors2023.BLUE.LIGHT} style={{ fontSize: '3rem' }}>
          Events
        </GlowSpan>
        <Text style={{ color: Colors2023.GRAY.SCHEMDIUM }}>
          Let&apos;s build your HackSC schedule!
        </Text>
      </Container>

      {isSmallScreen ? (
        <>
          <Button
            color="black"
            onClick={toggleMobileView}
            style={{ margin: '1rem 0' }}
          >
            Toggle View
          </Button>
          {mobileView === EventListType.ALL_EVENTS
            ? eventsGrouped && (
                <EventList
                  allEvents={eventsGrouped}
                  pinnedEvents={pinnedEventsGrouped}
                  type={EventListType.ALL_EVENTS}
                  setActiveEvent={(eventId) => setActiveEvent(eventId)}
                  setPinnedEvents={setPinnedEvents}
                />
              )
            : pinnedEventsGrouped && (
                <EventList
                  allEvents={eventsGrouped}
                  pinnedEvents={pinnedEventsGrouped}
                  type={EventListType.PINNED_EVENTS}
                  setActiveEvent={(eventId) => setActiveEvent(eventId)}
                  setPinnedEvents={setPinnedEvents}
                />
              )}
        </>
      ) : (
        <>
          <EventsContainer>
            <EventsCalendar
              events={eventsGrouped}
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
        </>
      )}

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
