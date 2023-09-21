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

  const deleteItemById = (id: string) =>
    setItems((items) => items.filter((item) => item.id !== id));

  const addItem = () =>
    setItems([...items, { id: uuidv4(), text: `New item` }]);

  const swipeRightOptions = (id: string): ISwipeActionProps => ({
    content: <BasicSwipeContent $position="left">Delete</BasicSwipeContent>,
    actionAnimation: contentAnimation,
    action: () => deleteItemById(id),
  });

  const swipeLeftOptions = (id: string): ISwipeActionProps => ({
    content: <BasicSwipeContent $position="right">Delete</BasicSwipeContent>,
    actionAnimation: contentAnimation,
    action: () => deleteItemById(id),
  });

  const threshold = 0.33;
  const transitionTimeout = 2500;

  return (
    <>
      <div className={styles['animations-swipeable-list__container']}>
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
            >
              {items.map(({ id, text }) => (
                <CSSTransition
                  classNames={styles['my-node']}
                  key={id}
                  timeout={transitionTimeout}
                >
                  <SwipeableListItem
                    key={id}
                    scrollStartThreshold={scrollStartThreshold}
                    swipeLeft={swipeLeftOptions(id)}
                    swipeRight={swipeRightOptions(id)}
                    swipeStartThreshold={swipeStartThreshold}
                    threshold={threshold}
                  >
                    <BasicListItem>{text}</BasicListItem>
                  </SwipeableListItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </SwipeableList>
      </div>
      <button className="page__button" onClick={addItem}>
        Add item
      </button>
    </>
  );
}

export default EventList;

const BasicListItem = styled.div`
  border-bottom: 1px solid #c4c4c4;
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  user-select: none;
  cursor: pointer;
`;

const BasicSwipeContent = styled.div<{ $position: 'left' | 'right' }>`
  background-color: red;
  box-sizing: border-box;
  color: white;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 8px;

  justify-content: ${(props) =>
    props.$position === 'left' ? 'flex-start' : 'flex-end'};
`;
