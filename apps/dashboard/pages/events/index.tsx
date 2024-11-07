import styled from 'styled-components';
import EventsCalendar from '../../components/events/events-calendar';
import { Modal, Text } from '@hibiscus/ui';
import BattlepassPointsBar from '../../components/battlepass/battlepass-points-bar';
import { MdLogout } from 'react-icons/md';
import Image from 'next/image';
import hibiscusIcon from '../../../../images/hibiscus-platform-logo.png';
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
import { Subheading, Button } from '@hacksc/sctw-ui-kit';

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
      const column = 0;
      for (const e of pinnedEvents) {
        // while (!isSameDate(e.startTime, eventsGrouped[column][0].startTime)) {
        //   if (eventsByDate.length <= column) {
        //     eventsByDate.push([]);
        //   }
        //   column++;
        // }

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
    <div style={{ backgroundColor: 'white', height: '100%' }}>
      {isSmallScreen ? (
        <>
          <div>
            <PinkText>Your Events</PinkText>
            {bpProg && (
              <BattlepassPointsBar
                rangeMinPoint={bpProg.level}
                rangeMaxPoint={bpProg.nextLevel}
                currentPoint={userPoints}
                minLabel={
                  <Text style={{ padding: '10px 0' }}>
                    <MinPoints>{userPoints + ' PTS'}</MinPoints>
                  </Text>
                }
                maxLabel={
                  BATTLEPASS_LEVEL_POINTS[bpProg.level] <
                  BATTLEPASS_LEVEL_POINTS[3] ? (
                    <Text style={{ padding: '10px 0' }}>
                      Next level @{' '}
                      <MaxPoints>{bpProg.nextLevel + ' PTS'}</MaxPoints>
                    </Text>
                  ) : null
                }
              />
            )}
          </div>

          <Button
            color="red"
            onClick={toggleMobileView}
            style={{ margin: '1rem 0' }}
          >
            {mobileView === EventListType.ALL_EVENTS
              ? 'View your events'
              : 'View all events'}
          </Button>
          {/* <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ecb400',
            }}
          >
            <MobileTopNav>
              <HeadingContainer>
                <Image
                  src={hibiscusIcon}
                  alt="HackSC Logo"
                  width={40}
                  height={40}
                />
                <StyledH1> HackSC</StyledH1>
              </HeadingContainer>
            </MobileTopNav>
            <MobilePage>
              <EventsColumn
                style={{ position: 'fixed', left: '10vw', top: '22vh' }}
              >
                <PinkText>Your Points</PinkText>
                {bpProg && (
                  <BattlepassPointsBar
                    rangeMinPoint={bpProg.level}
                    rangeMaxPoint={bpProg.nextLevel}
                    currentPoint={userPoints}
                    minLabel={
                      <Text>
                        <MinPoints>{userPoints + ' PTS'}</MinPoints>
                      </Text>
                    }
                    maxLabel={
                      BATTLEPASS_LEVEL_POINTS[bpProg.level] <
                      BATTLEPASS_LEVEL_POINTS[3] ? (
                        <Text>
                          <MaxPoints>{bpProg.nextLevel + ' PTS'}</MaxPoints>
                        </Text>
                      ) : null
                    }
                  />
                )}
                <PinkText>Your Events</PinkText>
                {(!pinnedEvents || pinnedEvents.length == 0) && (
                  <EmptyPinnedEvents>Your Events</EmptyPinnedEvents>
                )}
                {pinnedEvents && pinnedEvents.length !== 0 && (
                  <PinnedEvents
                    isMobile={true}
                    events={pinnedEvents}
                    openModal={(eventId) => setActiveEvent(eventId)}
                  />
                )}
              </EventsColumn>
            </MobilePage>
          </div> */}

          <MobilePage>
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
          </MobilePage>
        </>
      ) : (
        <>
          <Container>
            <StyledH1 style={{ color: 'black' }}>{user.firstName} {user.lastName}'s Calendar</StyledH1>
          </Container>
          {/* <EventsContainer> */}
            <EventsCalendar
              events={eventsGrouped}
              openModal={(eventId) => setActiveEvent(eventId)}
            />
            {/* <EventsColumn> */}
              {/* <PinkText>Your Points</PinkText>
              {bpProg && (
                <BattlepassPointsBar
                  rangeMinPoint={bpProg.level}
                  rangeMaxPoint={bpProg.nextLevel}
                  currentPoint={userPoints}
                  minLabel={
                    <Text style={{ padding: '10px 0' }}>
                      <MinPoints>{userPoints + ' PTS'}</MinPoints>
                    </Text>
                  }
                  maxLabel={
                    BATTLEPASS_LEVEL_POINTS[bpProg.level] <
                    BATTLEPASS_LEVEL_POINTS[3] ? (
                      <Text style={{ padding: '10px 0' }}>
                        Next level @{' '}
                        <MaxPoints>{bpProg.nextLevel + ' PTS'}</MaxPoints>
                      </Text>
                    ) : null
                  }
                />
              )} */}
              {/* <PinkText>Your Events</PinkText>
              {(!pinnedEvents || pinnedEvents.length == 0) && (
                <EmptyPinnedEvents>No Pinned Events!</EmptyPinnedEvents>
              )}
              {pinnedEvents && pinnedEvents.length !== 0 && (
                <PinnedEvents
                  isMobile={false}
                  events={pinnedEvents}
                  openModal={(eventId) => setActiveEvent(eventId)}
                />
              )} */}
            {/* </EventsColumn> */}
          {/* </EventsContainer> */}
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
    </div>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Filson Pro', sans-serif;
`;

const LogoutBox = styled.div`
  position: fixed;
  right: 30px;
  top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const EventsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  flex-shrink: 1;
`;

const EventsColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  gap: 1rem;
`;

const PinkText = styled.p`
  font-family: 'Filson Pro', sans-serif;
  color: #ff514f;
  font-weight: 600;
  font-size: 20px;
`;

const BlackH1 = styled.p`
  font-family: 'Filson Pro', sans-serif;
  color: black;
  font-weight: 700;
  font-size: 35px;
`;

const GlowYellowH1 = styled.p`
  font-family: 'Inter', sans-serif;
  color: #dcab0f;
  font-size: 20px;
  margin-right: 10px;
  letter-spacing: 0.2em;
  text-shadow: 0px 0px 15px #ecb400;
`;

const LogoutH1 = styled.p`
  font-family: 'Inter', sans-serif;
  color: black;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: right;
  margin-right: 10px;
`;

const LogoutIcon = styled(MdLogout)`
  color: black;
`;

const MobileTopNav = styled.div`
  background-color: #ecb400;
  width: 100%;
  height: 15vh;
  // border-bottom-left-radius: 10px;
  // border-bottom-right-radius: 10px;
`;

const MobilePage = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledH1 = styled.h1`
  font-family: 'Hanken Grotesk', 'Neue Haas Unica', sans-serif;
  font-weight: 700;
  font-size: 27px;
  display: inline;
  margin-left: 10px;
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10vw;
  position: fixed;
  top: 3vh;
`;

const MinPoints = styled.span`
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.2em;
  text-align: center;
  color: #ecb400;
  text-shadow: 0px 0px 50px #ffd13c;
`;

const MaxPoints = styled.span`
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.2em;
  text-align: center;
  color: #ff514f;
  text-shadow: 0px 0px 15px #ff5e5c80;
`;

const EmptyPinnedEvents = styled.button`
  color: #ff514f;
  border: 3px solid #ff514f;
  border-radius: 20px;
  font-family: Inter;
  font-size: 13px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  width: 30%;
  background-color: white;
  margin-top: 100px;
  margin-left: 150px;
`;
