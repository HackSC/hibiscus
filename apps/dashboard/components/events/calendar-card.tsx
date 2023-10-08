import { BoldText, Text } from '@hibiscus/ui';
import styled from 'styled-components';

interface EventCardProps {
  // CSS values for absolute position (percentage, px, etc.)
  width: string;
  height: string;
  top: string;
  left: string;

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
  position: absolute;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  left: ${(props) => props.left};

  background-color: #336675;

  padding: 0.5rem;
  margin: 0;

  display: flex;
  flex-direction: column;

  border-radius: 10px;

  font-size: 0.75rem;

  cursor: pointer;
`;
