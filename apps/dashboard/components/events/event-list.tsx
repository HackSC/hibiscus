import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { Event } from '../../common/events.utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EventListProps {}

// Code adapted from animation example in react-swipeable-list
function EventList(props: EventListProps) {
  const contentAnimation = ActionAnimations.REMOVE;
  const listAnimations = true;

  const [items, setItems] = useState(() => [
    { id: uuidv4(), text: 'Item 1' },
    { id: uuidv4(), text: 'Item 2' },
    { id: uuidv4(), text: 'Item 3' },
    { id: uuidv4(), text: 'Item 4' },
  ]);

  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const deleteItemById = (id: string) =>
    setItems((items) => items.filter((item) => item.id !== id));

  const addItem = () =>
    setItems([...items, { id: uuidv4(), text: `New item` }]);

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
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {items.map(({ id, text }) => (
                <CSSTransition
                  classNames={{
                    enter: styles['my-node-enter'],
                    enterActive: styles['my-node-enter-active'],
                    exit: styles['my-node-exit'],
                    exitActive: styles['my-node-exit-active'],
                  }}
                  key={id}
                  timeout={transitionTimeout}
                >
                  <SwipeableListItem
                    key={id}
                    scrollStartThreshold={scrollStartThreshold}
                    swipeLeft={swipeLeftOptions(id)}
                    swipeStartThreshold={swipeStartThreshold}
                    threshold={threshold}
                  >
                    <EventCard
                      event={{
                        eventId: 12345,
                        eventName: 'Puppy Pen',
                        startTime: new Date(),
                        endTime: new Date(),
                        location: 'THH 102',
                        bpPoints: 100,
                      }}
                      isExpanded={expandedEvent === 12345}
                      onClick={() => setExpandedEvent(12345)}
                      openModal={() => {}}
                    />
                  </SwipeableListItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </SwipeableList>
      </SwipeableListContainer>
      <button className="page__button" onClick={addItem}>
        Add item
      </button>
    </>
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
  openModal: (eventId: number) => void;
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
        <BoldText>Puppy Pen</BoldText>
        <Text>11:00 AM – 1:00 PM</Text>
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
