import { useState } from 'react';
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
import { Event, getDayDate, unpinEvent } from '../../common/events.utils';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';
import { Colors } from '@hacksc/sctw-ui-kit';

export enum EventListType {
  ALL_EVENTS,
  PINNED_EVENTS,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EventListProps {
  allEvents: Event[][];
  pinnedEvents: Event[][];
  type: EventListType;
  setActiveEvent: (eventId: string) => void;
  setPinnedEvents: (events: Event[]) => void;
}

// Code adapted from animation example in react-swipeable-list
function EventList(props: EventListProps) {
  const contentAnimation = ActionAnimations.REMOVE;
  const hasAnimations = props.type === EventListType.PINNED_EVENTS;

  const items =
    props.type === EventListType.ALL_EVENTS
      ? props.allEvents
      : props.pinnedEvents;
  const columns = props.allEvents.map(
    (events) =>
      `${getDayDate(events[0].startTime).toLocaleDateString('en-us', {
        month: 'short',
      })} ${getDayDate(events[0].startTime).toLocaleDateString('en-us', {
        day: '2-digit',
      })}`
  );

  const [column, setColumn] = useState<number>(0);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const { user } = useHibiscusUser();

  const deleteItemById = (id: string) => {
    unpinEvent(
      user.id,
      id,
      getCookie(getEnv().Hibiscus.Cookies.accessTokenName)?.toString()
    );

    const newItems = items.flat();
    newItems.splice(
      newItems.findIndex((it) => it.eventId === id),
      1
    );
    props.setPinnedEvents(newItems);
  };

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

  return (
    items && (
      <>
        <Calendar>
          <CalendarHead>
            {column > 0 && (
              <LeftArrow onClick={() => setColumn(column - 1)}>&lt;</LeftArrow>
            )}
            {column < columns.length - 1 && (
              <RightArrow onClick={() => setColumn(column + 1)}>
                &gt;
              </RightArrow>
            )}
            <BoldText>{columns[column]}</BoldText>
          </CalendarHead>
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
                  exit={hasAnimations}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  key={`${props.type} ${column}`} // To disable transition animations when changing columns and views
                >
                  {items[column]?.map((event) => (
                    <CSSTransition
                      classNames={{
                        exit: styles['my-node-exit'],
                        exitActive: styles['my-node-exit-active'],
                      }}
                      key={event.eventId}
                      timeout={transitionTimeout}
                    >
                      <SwipeableListItem
                        key={event.eventId}
                        scrollStartThreshold={scrollStartThreshold}
                        swipeLeft={
                          hasAnimations
                            ? swipeLeftOptions(event.eventId)
                            : undefined
                        }
                        swipeStartThreshold={swipeStartThreshold}
                        threshold={threshold}
                      >
                        <EventCardWrapper>
                          <EventCard
                            event={event}
                            isExpanded={expandedEvent === event.eventId}
                            onClick={() => setExpandedEvent(event.eventId)}
                            openModal={(eventId) => {
                              console.log(eventId);
                              props.setActiveEvent(eventId);
                            }}
                          />
                        </EventCardWrapper>
                      </SwipeableListItem>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              )}
            </SwipeableList>
          </SwipeableListContainer>
        </Calendar>
      </>
    )
  );
}

export default EventList;

const Calendar = styled.div`
  border-radius: 20px;
  overflow: hidden;
`;

const CalendarHead = styled.div`
  position: relative;

  text-align: center;
  font-size: 1.5rem;
  background-color: ${Colors.Red.DonatedBlood};
  padding: 1rem;
`;

const LeftArrow = styled.a`
  position: absolute;
  left: 15px;
`;

const RightArrow = styled.a`
  position: absolute;
  right: 15px;
`;

const SwipeableListContainer = styled.div`
  width: 100%;
  color: #336675;
  background-color: ${Colors.Neutral.PaleBagel};
  padding: 0.5rem 1rem;
`;

const BasicSwipeContent = styled.div<{ $position: 'left' | 'right' }>`
  background-color: ${Colors2023.RED.DARK};
  box-sizing: border-box;
  color: white;
  height: calc(100% - 1rem);
  display: flex;
  align-items: center;
  padding: 1.5rem;

  border-radius: 15px;

  justify-content: ${(props) =>
    props.$position === 'left' ? 'flex-start' : 'flex-end'};
`;

const EventCardWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 0;
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
        <BoldText style={{ color: Colors.Red.DonatedBlood }}>
          {props.event.eventName}
        </BoldText>
        <Text style={{ color: Colors.Red.DonatedBlood }}>
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
          <BoldText style={{ color: Colors.Red.DonatedBlood }}>
            {props.event.eventName}
          </BoldText>
          <BoldText
            style={{ color: Colors.Red.DonatedBlood, fontSize: '0.75rem' }}
          >
            {props.event.bpPoints} PTS
          </BoldText>
        </Row>
        <Text style={{ color: Colors.Red.DonatedBlood, fontSize: '0.75rem' }}>
          {startTime} - {endTime}
        </Text>
        <Text style={{ color: Colors.Red.DonatedBlood, fontSize: '0.75rem' }}>
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
  background-color: ${Colors.Neutral.Bagel};

  border-radius: 15px;

  padding: 1rem;
`;

const CardOpen = styled.div`
  display: flex;

  align-items: stretch;

  border: 2px solid ${Colors.Yellow.ArthurSweater};
  border-radius: 15px;

  overflow: hidden;

  cursor: pointer;

  width: 100%;
`;

const CardLeft = styled.div`
  background-color: ${Colors.Yellow.ArthurSweater};

  width: 10px;
`;

const CardRight = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${Colors.Neutral.Bagel};

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
