import styled from 'styled-components';
import { H2 } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';

/* eslint-disable-next-line */
export interface CalendarEventProps {
  eventStartTime: Date;
  eventEndTime: Date;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventPoints: number;
}

const StyledCalendarEvent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 600px;
  height: 80px;
  margin-bottom: 10px;
`;

const EventDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  top: 15%;
  flex: 50%;
  position: relative;
`;

const EventDate = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 20%;
  text-align: center;
  color: white;
  top: 18%;
  position: relative;
  font-size: 12px;
`;

const PointSection = styled.div`
  flex: 20%;
  text-align: center;
  color: white;
  top: 30%;
  position: relative;
  font-size: 12px;
`;

export function CalendarEvent(props: CalendarEventProps) {
  const eventDay = props.eventStartTime.getDay();
  const eventMonth = props.eventStartTime.toLocaleString('en-US', {
    month: 'short',
  });
  const formattedTime =
    props.eventStartTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }) +
    ' - ' +
    props.eventEndTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  const eventPointsFormatted = props.eventPoints + ' PTS';

  return (
    <StyledCalendarEvent>
      <EventDate>
        <H2 style={{ fontSize: '24px', height: '24px' }}>{eventDay}</H2>
        <H2 style={{ fontSize: '24px', height: '24px' }}>{eventMonth}</H2>
      </EventDate>
      <EventDescription>
        <H2 style={{ fontSize: '24px', height: '24px', color: 'white' }}>
          {props.eventName}
        </H2>
        <div
          style={{
            color: Colors2023.GRAY.MEDIUM,
            top: '15%',
            position: 'relative',
          }}
        >
          <div>{' ' + props.eventLocation + ' | ' + formattedTime}</div>
          <div>{props.eventDescription}</div>
        </div>
      </EventDescription>
      <PointSection>{eventPointsFormatted}</PointSection>
    </StyledCalendarEvent>
  );
}

export default CalendarEvent;
