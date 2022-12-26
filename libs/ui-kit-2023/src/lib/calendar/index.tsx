import { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import './calendar.less';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CalendarProps {}

export function Calendar(props: CalendarProps) {
  const [date, setDate] = useState(new Date());
  return (
    <Wrapper>
      <ReactCalendar
        onChange={setDate}
        value={date}
        minDetail="year"
        next2Label={null}
        prev2Label={null}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
`;
