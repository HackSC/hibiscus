import { Colors2023 } from '@hibiscus/styles';
import styled from 'styled-components';
import { useEffect, useRef, useState, ReactNode } from 'react';
import { H1, Text } from '@hibiscus/ui';
import { Event, getDayDate } from '../../common/events.utils';
import CalendarCard from './calendar-card';

const COLUMN_WIDTH = 210;
const COLUMN_HEIGHT = 100;
const COLUMN_MILLIS = 24 * 60 * 60 * 1000;
const COLUMN_START_MILLIS = 0; // number of millis after 00:00
const COLUMN_MARGIN = 10;

interface EventsCalendarProps {
  events: Event[][];
  openModal: (eventId: string) => void;
}

function EventsCalendar(props: EventsCalendarProps) {
  const ref = useRef(null);
  const scrollRefs = useRef([]);
  const [columns, setColumns] = useState(3);
  const [offset, setOffset] = useState(0);
  const [cards, setCards] = useState<ReactNode[][] | null>(null);

  const events = props.events;

  const hours = Array.from({ length: 24 }, (_, index) => {
    const hour = index === 0 ? 12 : index % 12 === 0 ? 12 : index % 12;
    const period = index <= 12 ? 'AM' : 'PM';
    return `${hour} ${period}`;
  });

  // Function to synchronize scroll positions
  const syncScroll = (event) => {
    const scrollTop = event.target.scrollTop;

    // Update scroll position for each .row2 element except the one being scrolled
    scrollRefs.current.forEach((el) => {
      if (el && el !== event.target) {
        el.scrollTop = scrollTop;
      }
    });
  };

  // Preset scroll to current time
  useEffect(() => {
    const d = new Date();
    console.log(d.getHours() * 100);

    scrollRefs.current.forEach((el) => {
      if (el) {
        el.scrollTop = d.getHours() * 100;
      }
    });
  }, [cards]); // Empty dependency array to ensure this only runs on mount

  useEffect(() => {
    const gridContainer = document.querySelectorAll('.grid-container');
    if (gridContainer.length > 0) {
      const gridStyle = window.getComputedStyle(gridContainer[0]);
      const gridTemplateColumns = gridStyle.getPropertyValue(
        'grid-template-columns'
      );
      const numberOfColumns = gridTemplateColumns.split(' ').length;
      console.log(numberOfColumns);
    }

    // console.log(numberOfColumns);
  }, [cards]);

  // Queries width of component to calculate number of columns
  // Dynamically recalculates on resize
  // useEffect(() => {
  //   setColumns(calcColumns(COLUMN_WIDTH, ref.current?.offsetWidth ?? 0));
  //   const getwidth = () => {
  //     setColumns(calcColumns(COLUMN_WIDTH, ref.current?.offsetWidth ?? 0));
  //   };
  //   window.addEventListener('resize', getwidth);
  //   return () => window.removeEventListener('resize', getwidth);
  // }, []);

  // Render event cards
  useEffect(() => {
    if (events !== null) {
      // Show correct pagination
      const eventsToShow = events.slice(offset, offset + columns);

      // Convert events to JSX elements
      const cards: ReactNode[][] = [];
      for (const es of eventsToShow) {
        const date = getDayDate(es[0].startTime);
        const colCards = renderCalendarColumn(es, date, props.openModal);
        cards.push(colCards);
      }
      setCards(cards);
    }
  }, [events, columns, offset]);

  return (
    <>
      <CalendarGrid ref={ref} columns={columns}>
        {cards && (
          <>
            <Span></Span> {/* Take space in the row1 col1*/}
            <Times
              onScroll={syncScroll}
              ref={(el) => (scrollRefs.current[3] = el)}
            >
              {hours.map((time, index) => (
                <Time key={index}>{time}</Time>
              ))}
            </Times>
            {/* Note:  Arrows to toggle between dates */}
            {/* {offset > 0 && (
              <LeftArrow
                onClick={() => setOffset(Math.max(offset - columns, 0))}
              >
                &lt;
              </LeftArrow>
            )}

            {offset < events.length && (
              <RightArrow onClick={() => setOffset(offset + columns)}>
                &gt;
              </RightArrow>
            )} */}
            {/* Note: Map Event dates to Headers */}
            {[...Array(columns)].map((_, idx) => (
              <CalendarHeader key={idx}>
                {events[idx + offset] && (
                  <>
                    <Text>
                      {getDayDate(
                        events[idx + offset][0].startTime
                      ).toLocaleDateString('en-us', { month: 'short' })}
                    </Text>
                    <NumText>
                      {getDayDate(
                        events[idx + offset][0].startTime
                      ).toLocaleDateString('en-us', { day: '2-digit' })}
                    </NumText>
                  </>
                )}
              </CalendarHeader>
            ))}
            {/* Note: Temporary Hard coded Headers */}
            {/* <CalendarHeader >
                  <Text>
                    Nov
                  </Text>
                  <NumText>
                    08
                  </NumText>
            </CalendarHeader>

            <CalendarHeader >
                  <Text>
                    Nov
                  </Text>
                  <NumText>
                    09
                  </NumText>
            </CalendarHeader>

            <CalendarHeader >
                  <Text>
                    Nov
                  </Text>
                  <NumText>
                    10
                  </NumText>
            </CalendarHeader> */}
            {[...Array(columns)].map((_, idx) => (
              <CalendarColumn
                onScroll={syncScroll}
                ref={(el) => (scrollRefs.current[idx] = el)}
                key={idx}
              >
                <ColumnGrid key={idx} className="grid-container">
                  {cards[idx]}
                </ColumnGrid>
              </CalendarColumn>
            ))}
          </>
        )}
      </CalendarGrid>
    </>
  );
}

export default EventsCalendar;

interface CalendarGridProps {
  columns: number;
}

interface LastRowProps {
  isLastInRow: boolean;
}

const ColumnGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(24, 100px);
  grid-template-columns: auto;
  /* grid-template-columns: span 2; */
  /* grid-column-start: /1; */
  column-gap: 10px;
  width: 100%;
`;

const Times = styled.div`
  grid-row-start: 2;
  grid-row-end: 3;

  display: grid;
  grid-template-rows: repeat(24, 100px);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Time = styled.div`
  color: #9b9191;
  /* margin-bottom: 50px; */
`;

const Span = styled.div`
  grid-column-start: 1;
`;

const NumText = styled.p`
  font-family: 'Hanken Grotesk', 'Neue Haas Unica', sans-serif;
  font-weight: 500;
  font-size: 31px;
`;

const CalendarGrid = styled.div<CalendarGridProps>`
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 50px repeat(${(props) => props.columns}, 1fr);
  max-width: 70vw;

  border-radius: 5px;

  height: 50vh;
  /* overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none; */

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

// #FF524E
const CalendarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid black;

  padding: 1rem;
`;

const CalendarColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  height: 50vh;
  padding-left: 15px;
  padding-right: 15px;

  border: 1px solid black;

  /* background-color: #fef8e5; */
  /* border-right: 3px solid #ce0c0a; */
  /* border-top: 3px solid #ce0c0a; */

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* :nth-last-child(1) {
    border-right: none;
  } */
`;

const LeftArrow = styled.a`
  position: absolute;
  left: 5px;
`;

const RightArrow = styled.a`
  position: absolute;
  right: 5px;
`;

function calcColumns(columnWidth: number, totalWidth: number): number {
  return Math.floor(totalWidth / (columnWidth + 2));
}

/**
 * @param events Events within a specific day
 * @returns List of list of events, with each list representing a column
 */
function organizeCalendarCards(events: Event[]): Event[][] {
  const organized: Event[][] = [];

  // Assume events is sorted by start time
  // Organize events in lists based on which "column" to be put in
  for (const e of events) {
    let i = 0;
    for (const col of organized) {
      const last = col.at(-1);
      if (e.startTime >= last.endTime) {
        organized[i].push(e);
        break;
      }

      i++;
    }

    // Cannot fit event into any existing column -> create new one
    if (i == organized.length) {
      organized[i] = [e];
    }
  }

  return organized;
}

/**
 * @param events Events within a specific day
 * @param date Date on which events occur, with local timezone and set to 00:00
 * @returns React components which render the calendar cards
 */
function renderCalendarColumn(
  events: Event[],
  date: Date,
  openModal: (eventId: string) => void
): ReactNode[] {
  const organized = organizeCalendarCards(events);

  // Reverse each array for faster popping
  organized.forEach((col) => col.reverse());

  // Indices pointing to the end of the arrays in organized
  // We count backwards because the arrays have been reversed
  const idxs = [...Array(organized.length)].map(
    (_, i) => organized[i].length - 1
  );

  const nodes = [];

  while (idxs.some((idx) => idx >= 0)) {
    // Get array of events which the tracked indices are pointing at
    // or null if we have exhausted that column
    const es = organized.map((col, i) => (idxs[i] >= 0 ? col[idxs[i]] : null));

    // Get array of events of previously tracked index
    const esPrev = organized.map((col, i) =>
      idxs[i] < col.length - 1 ? col[idxs[i] + 1] : null
    );

    // Get earliest start event and render that
    // These variables are guaranteed to be initialized due to the constraints of the while loop
    let earliestEvent: Event = null; // Why am I allowed to do this
    let earliestIdx: number;
    let i = 0;

    for (const e of es) {
      if (e !== null) {
        if (earliestEvent === null) {
          earliestEvent = e;
          earliestIdx = i;
        } else if (e.startTime < earliestEvent.startTime) {
          earliestEvent = e;
          earliestIdx = i;
        }
      }

      i++;
    }

    // Calculate percentage width of card based on position and whether there are any more
    // cards to the right of it
    let cols = earliestIdx + 1;
    i = earliestIdx + 1;

    while (
      i < es.length &&
      ((es[i] !== null && es[i].startTime < earliestEvent.endTime) ||
        (esPrev[i] !== null && esPrev[i].endTime > earliestEvent.startTime))
      // Ugliest while statement in this entire repo
    ) {
      cols++;
      i++;
    }

    // Calculate size and position of card
    const start = earliestEvent.startTime.getTime();
    const end = earliestEvent.endTime.getTime();

    const width = 100 / cols;
    const height = ((end - start) / COLUMN_MILLIS) * 100;
    const left = (earliestIdx / cols) * 100;

    // Adjust for timezone
    const startHour = earliestEvent.startTime.getHours();
    const endHour = earliestEvent.endTime.getHours();
    const startMins = earliestEvent.startTime.getMinutes();
    const endMins = earliestEvent.endTime.getMinutes();

    // Adjust for "margins"
    let widthSubtract = COLUMN_MARGIN;
    if (earliestIdx === 0) {
      widthSubtract += COLUMN_MARGIN / 2;
    }
    if (earliestIdx === cols - 1) {
      widthSubtract += COLUMN_MARGIN / 2;
    }

    let leftAdd = COLUMN_MARGIN;
    if (earliestIdx !== 0) {
      leftAdd /= 2;
    }

    const widthCSS = `calc(${width}% - ${widthSubtract}px)`;
    const leftCSS = `calc(${left}% + ${leftAdd}px)`;

    nodes.push(
      <CalendarCard
        openModal={openModal}
        top={`${(startMins / 60) * 100 + 5}px`}
        bottom={`${(endMins / 60) * 100 + 5}px`}
        gridRowStart={`${startHour + 1}`}
        gridRowEnd={`${endHour + 1}`}
        {...earliestEvent}
      ></CalendarCard>
    );

    idxs[earliestIdx]--;
  }

  return nodes;
}
