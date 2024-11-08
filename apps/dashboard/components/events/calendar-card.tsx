import { BoldText, Text } from '@hibiscus/ui';
import styled from 'styled-components';

interface EventCardProps {
  // CSS values for absolute position (percentage, px, etc.)
  // width: string;
  // height: string;
  // left: string;
  top: string;
  bottom: string;
  gridRowStart: string;
  gridRowEnd: string;

  // Event details
  eventId: string;
  eventName: string;
  startTime: Date;
  endTime: Date;
  location: string;
  bpPoints: number;

  // Click events
  openModal: (eventId: string) => void;
}

function CalendarCard(props: EventCardProps) {
  const startTime = props.startTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = props.endTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card onClick={() => props.openModal(props.eventId)} {...props}>
      <Text style={{ textAlign: 'right' }}>{props.bpPoints} PTS</Text>
      <BoldText>{props.eventName}</BoldText>
      <Text>
        {startTime} - {endTime}
      </Text>
      <Text>{props.location}</Text>
    </Card>
  );
}

export default CalendarCard;

const Card = styled.div<EventCardProps>`
  margin: 0;
  padding: 0.5rem;
  font-size: 0.75em;

  grid-row-start: ${(props) => props.gridRowStart};
  grid-row-end: ${(props) => props.gridRowEnd};

  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  overflow-x: auto;
  scrollbar-width: none;
  white-space: nowrap;

  background-color: #daeeff;
  border: 1px solid black;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  cursor: pointer;
  margin-top: ${(props) => props.top};
  margin-bottom: 5px;
  padding-bottom: ${(props) => props.bottom};
`;
