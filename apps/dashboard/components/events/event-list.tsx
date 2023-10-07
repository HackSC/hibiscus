import { useEffect, useState } from 'react';
import {
  ActionAnimations,
  ISwipeActionProps,
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './event-list.module.css';
import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Text } from '@hibiscus/ui';
import { ImCross } from 'react-icons/im';
import { Event, getAllEvents } from '../../common/events.utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EventListProps {
  events: Event[];
}

// Code adapted from animation example in react-swipeable-list
function EventList(props: EventListProps) {
  const contentAnimation = ActionAnimations.REMOVE;
  const listAnimations = true;

  const [items, setItems] = useState<Event[]>(props.events);

  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const deleteItemById = (id: string) =>
    setItems((items) => items.filter((item) => item.eventId !== id));

  const swipeLeftOptions = (id: string): ISwipeActionProps => ({
    content: (
      <BasicSwipeContent $position="right">
        <ImCross />
      </BasicSwipeContent>
    ),
    actionAnimation: contentAnimation,
    action: () => deleteItemById(id),
  });

  const threshold = 0.33;
  const transitionTimeout = 2500;

  useEffect(() => {
    async function fetchData() {
      const events = await getAllEvents();
      setItems(events);
    }

    fetchData();
  }, []);

  return (
    items && (
      <>
        <SwipeableListContainer>
          <SwipeableList threshold={threshold}>
            {({
              className,
              scrollStartThreshold,
              swipeStartThreshold,
              threshold,
            }) => (
              <TransitionGroup
                className={className}
                enter={listAnimations}
                exit={listAnimations}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {items.map((event) => (
                  <CSSTransition
                    classNames={{
                      enter: styles['my-node-enter'],
                      enterActive: styles['my-node-enter-active'],
                      exit: styles['my-node-exit'],
                      exitActive: styles['my-node-exit-active'],
                    }}
                    key={event.eventId}
                    timeout={transitionTimeout}
                  >
                    <SwipeableListItem
                      key={event.eventId}
                      scrollStartThreshold={scrollStartThreshold}
                      swipeLeft={swipeLeftOptions(event.eventId)}
                      swipeStartThreshold={swipeStartThreshold}
                      threshold={threshold}
                    >
                      <EventCard
                        event={event}
                        isExpanded={expandedEvent === event.eventId}
                        onClick={() => setExpandedEvent(event.eventId)}
                        openModal={() => {}}
                      />
                    </SwipeableListItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            )}
          </SwipeableList>
        </SwipeableListContainer>
      </>
    )
  );
}

export default EventList;

const SwipeableListContainer = styled.div`
  width: 100%;
  margin: 24px 0;
  color: #336675;
`;

const BasicSwipeContent = styled.div<{ $position: 'left' | 'right' }>`
  background-color: ${Colors2023.RED.DARK};
  box-sizing: border-box;
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1.5rem;

  border-radius: 15px;

  justify-content: ${(props) =>
    props.$position === 'left' ? 'flex-start' : 'flex-end'};
`;

interface EventCardProps {
  event: Event;
  isExpanded: boolean;
  onClick: () => void;
  openModal: (eventId: string) => void;
}

function EventCard(props: EventCardProps) {
  const startTime = props.event.startTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = props.event.endTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (!props.isExpanded) {
    return (
      <CardClosed onClick={props.onClick}>
        <BoldText>{props.event.eventName}</BoldText>
        <Text>
          {startTime} - {endTime}
        </Text>
      </CardClosed>
    );
  }

  return (
    <CardOpen onClick={() => props.openModal(props.event.eventId)}>
      <CardLeft />

      <CardRight>
        <Row>
          <BoldText style={{ color: '#336675' }}>
            {props.event.eventName}
          </BoldText>
          <BoldText style={{ color: 'black', fontSize: '0.75rem' }}>
            {props.event.bpPoints} PTS
          </BoldText>
        </Row>
        <Text style={{ color: Colors2023.GRAY.MEDIUM, fontSize: '0.75rem' }}>
          {startTime} - {endTime}
        </Text>
        <Text style={{ color: Colors2023.GRAY.MEDIUM, fontSize: '0.75rem' }}>
          {props.event.location}
        </Text>
      </CardRight>
    </CardOpen>
  );
}

const CardClosed = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  background-color: ${Colors2023.GRAY.LIGHT};

  border-radius: 15px;

  padding: 1rem 2rem;
`;

const CardOpen = styled.div`
  display: flex;

  align-items: stretch;

  border: 2px solid ${Colors2023.GRAY.SCHEMDIUM};
  border-radius: 15px;

  overflow: hidden;

  cursor: pointer;

  width: 100%;
`;

const CardLeft = styled.div`
  background-color: #336675;

  width: 10px;
`;

const CardRight = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${Colors2023.GRAY.LIGHT};

  padding: 1rem;
  height: 100%;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
