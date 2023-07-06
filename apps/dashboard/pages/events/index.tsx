import styled from 'styled-components';
import EventsCalendar from '../../components/events/events-calendar';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Modal, Text } from '@hibiscus/ui';
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
import { Event } from '../../common/events.utils';

// Hardcoded events
const events = [
  {
    eventId: 1,
    eventName: 'Opening Ceremony',
    startTime: new Date(2023, 8, 2, 5),
    endTime: new Date(2023, 8, 2, 8),
    location: 'Bovard Auditorium',
    bpPoints: 100,
    description: 'An event abcdefgh what do I write here',
  },
  {
    eventId: 2,
    eventName: 'Event Name',
    startTime: new Date(2023, 8, 2, 5, 30),
    endTime: new Date(2023, 8, 2, 10),
    location: 'THH 101',
    bpPoints: 100,
    description: 'An event abcdefgh what do I write here',
  },
  {
    eventId: 3,
    eventName: 'Event Name',
    startTime: new Date(2023, 8, 2, 11),
    endTime: new Date(2023, 8, 2, 12),
    location: 'THH 101',
    bpPoints: 100,
    description: 'An event abcdefgh what do I write here',
  },
];

export function Index() {
  return (
    <BattlepassAPIProvider mock={false}>
      <EventPage />
    </BattlepassAPIProvider>
  );
}

function EventPage() {
  // Modal state
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  // Battlepass React hooks
  const battlepassAPI = useBattlepassAPI();
  const { user } = useHibiscusUser();
  const [bpProg, setBattlepassProgress] = useState<BattlepassProgress | null>(
    null
  );
  const [userPoints, setUserPoints] = useState<number | null>(null);

  // Battlepass calculations
  useEffect(() => {
    battlepassAPI.getUserTotalPoints(user.id).then((res) => {
      const bpp = calculateBattlepassProgress(res.data.points);
      setUserPoints(res.data.points);
      setBattlepassProgress(bpp);
    });
  }, []);

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
            openModal={(eventId) =>
              setActiveEvent(events.find((e) => e.eventId === eventId))
            }
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
              events={events}
              openModal={(eventId) =>
                setActiveEvent(events.find((e) => e.eventId === eventId))
              }
            />
          </EventsColumn>
        </EventsContainer>
      </Container>

      <Modal
        isOpen={activeEvent !== null}
        closeModal={() => setActiveEvent(null)}
      >
        {activeEvent && (
          <EventDetails>
            <BoldText style={{ fontSize: '1.5rem' }}>
              {activeEvent.eventName}
            </BoldText>
            <Text>
              {activeEvent.startTime.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
              })}{' '}
              |{' '}
              {activeEvent.startTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              -{' '}
              {activeEvent.endTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text>{activeEvent.location}</Text>
            <Text>{activeEvent.description}</Text>
            <Button color="blue" style={{ marginLeft: 'auto' }}>
              + Add To My Events
            </Button>
          </EventDetails>
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

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${Colors2023.GRAY.MEDIUM};
  border: 3px solid ${Colors2023.GRAY.SCHEMDIUM};
  border-radius: 10px;

  padding: 2rem;
  gap: 1rem;

  width: 600px;
`;
