import styled from 'styled-components';
import CalendarEvent from '../calendar-event/calendar-event';
import { CalendarEventProps } from '../calendar-event/calendar-event';

/* eslint-disable-next-line */
export interface CalendarProps {}

const StyledCalendar = styled.div``;

const calendarInformation: CalendarEventProps = {
  eventStartTime: new Date(2022, 0o1, 0o4, 12),
  eventEndTime: new Date(2022, 0o1, 0o4, 3),
  eventName: 'Puppy Pen',
  eventDescription: 'Come to the first event of the hackathon',
  eventLocation: 'TTH 102',
  eventPoints: 100,
};

export function Calendar(props: CalendarProps) {
  return (
    <StyledCalendar>
      <ItemsWrapper>
        <CalendarEvent {...calendarInformation} />
        <CalendarEvent {...calendarInformation} />
        <CalendarEvent {...calendarInformation} />
      </ItemsWrapper>
    </StyledCalendar>
  );
}

const ItemsWrapper = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  /* background-color: #3b3b3b; */
  box-shadow: 0px 0px 5px #8e8e8e;
  border-radius: 10px;
  gap: 10px;
  max-width: max-content;
  margin: 5px 40px 0 20px;
  height: 300px;
`;

export default Calendar;
