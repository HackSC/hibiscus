import { Colors2023 } from '@hibiscus/styles';
import styled from 'styled-components';
import { useEffect, useRef, useState, ReactNode } from 'react';
import { Text } from '@hibiscus/ui';
import { Event } from '../../common/events.utils';
import CalendarCard from './calendar-card';

const COLUMN_WIDTH = 210;
const COLUMN_HEIGHT = 2000;
const COLUMN_MILLIS = 24 * 60 * 60 * 1000;
const COLUMN_START_MILLIS = 0; // number of millis after 00:00
const COLUMN_MARGIN = 10;

interface EventsCalendarProps {
  openModal: (eventId: number) => void;
}

function EventsCalendar(props: EventsCalendarProps) {
  const ref = useRef(null);
  const [columns, setColumns] = useState(0);

  // Queries width of component to calculate number of columns
  // Dynamically recalculates on resize
  useEffect(() => {
    setColumns(calcColumns(COLUMN_WIDTH, ref.current?.offsetWidth ?? 0));
    const getwidth = () => {
      setColumns(calcColumns(COLUMN_WIDTH, ref.current?.offsetWidth ?? 0));
    };
    window.addEventListener('resize', getwidth);
    return () => window.removeEventListener('resize', getwidth);
  }, []);

  // Hardcoded events
  const cards = [...Array(columns)].map((_, idx) => {
    const events = [
      {
        eventId: 1,
        eventName: 'Opening Ceremony',
        startTime: new Date(2023, 8, idx + 1, 5),
        endTime: new Date(2023, 8, idx + 1, 8),
        location: 'Bovard Auditorium',
        bpPoints: 100,
      },
      {
        eventId: 2,
        eventName: 'Event Name',
        startTime: new Date(2023, 8, idx + 1, 5, 30),
        endTime: new Date(2023, 8, idx + 1, 10),
        location: 'THH 101',
        bpPoints: 100,
      },
      {
        eventId: 3,
        eventName: 'Event Name',
        startTime: new Date(2023, 8, idx + 1, 11),
        endTime: new Date(2023, 8, idx + 1, 12),
        location: 'THH 101',
        bpPoints: 100,
      },
    ];

    return renderCalendarColumn(
      events,
      new Date(2023, 8, idx + 1),
      props.openModal
    );
  });

  return (
    <CalendarGrid ref={ref} columns={columns}>
      {[...Array(columns)].map((_, idx) => (
        <CalendarHeader key={idx}>
          <Text>Sept</Text>
          <Text>{idx + 1}</Text>
        </CalendarHeader>
      ))}
      {[...Array(columns)].map((_, idx) => (
        <CalendarColumn key={idx}>{cards[idx]}</CalendarColumn>
      ))}
    </CalendarGrid>
  );
}

export default EventsCalendar;

interface CalendarGridProps {
  columns: number;
}

const CalendarGrid = styled.div<CalendarGridProps>`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);

  width: 100%;

  border: 3px solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 5px;
`;

const CalendarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #336675;

  padding: 1rem;
`;

const CalendarColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  height: ${COLUMN_HEIGHT}px;

  background-color: ${Colors2023.GRAY.STANDARD};
  border-right: 3px solid ${Colors2023.GRAY.MEDIUM};
  border-top: 3px solid ${Colors2023.GRAY.MEDIUM};

  :nth-last-child(1) {
    border-right: none;
  }
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
  openModal: (eventId: number) => void
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
    const top =
      ((start - date.getTime() - COLUMN_START_MILLIS) / COLUMN_MILLIS) * 100;

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
        width={widthCSS}
        height={`${height}%`}
        left={leftCSS}
        top={`${top}%`}
        {...earliestEvent}
      ></CalendarCard>
    );

    idxs[earliestIdx]--;
  }

  return nodes;
}
