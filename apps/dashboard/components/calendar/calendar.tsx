import styled from 'styled-components';
import CalendarEvent from '../calendar-event/calendar-event';

/* eslint-disable-next-line */
export interface CalendarProps {}

const StyledCalendar = styled.div`
  color: pink;
`;

export function Calendar(props: CalendarProps) {
  return (
    <StyledCalendar>
      <ItemsWrapper>
        <CalendarEvent />
        <CalendarEvent />
        <CalendarEvent />
      </ItemsWrapper>
    </StyledCalendar>
  );
}

const ItemsWrapper = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  background-color: #3b3b3b;
  box-shadow: 0px 0px 5px #8e8e8e;
  border-radius: 10px;
  gap: 10px;
  max-width: max-content;
  margin: 5px 40px 0 20px;
  height: 250px;
`;

export default Calendar;
