import styled from 'styled-components';
import { H2 } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/Md';

/* eslint-disable-next-line */
export interface CalendarEventProps {}

const Day = '04';
const Month = 'Feb';
const EventName = 'Puppy Pen';
const EventLocation = 'TTH 102';
const EventPoints = '100';
const StartAndEndTime = '12:00 - 3:00 pm';

const StyledCalendarEvent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 420px;
  height: 80px;
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
  top: 30%;
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
  return (
    <StyledCalendarEvent>
      <EventDate>
        <H2 style={{ fontSize: '24px', height: '24px' }}>{Day}</H2>
        <H2 style={{ fontSize: '24px', height: '24px' }}>{Month}</H2>
      </EventDate>
      <EventDescription>
        <H2 style={{ fontSize: '24px', height: '24px', color: 'white' }}>
          {EventName}
        </H2>
        <div
          style={{
            color: Colors2023.GRAY.MEDIUM,
            top: '15%',
            position: 'relative',
          }}
        >
          <div>
            <AiOutlineClockCircle style={{ verticalAlign: 'middle' }} />
            {StartAndEndTime}
          </div>
          <div>
            <MdLocationOn style={{ verticalAlign: 'middle' }} />
            {EventLocation}
          </div>
        </div>
      </EventDescription>
      <PointSection>{EventPoints} PTS</PointSection>
    </StyledCalendarEvent>
  );
}

export default CalendarEvent;
