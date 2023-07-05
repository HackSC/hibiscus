import { BoldText, Text } from '@hibiscus/ui';
import styled from 'styled-components';

interface EventCardProps {
  // CSS values for absolute position (percentage, px, etc.)
  width: string;
  height: string;
  top: string;
  left: string;

  // Event details
  eventName: string;
  startTime: Date;
  endTime: Date;
  location: string;
  bpPoints: number;
}

function EventCard(props: EventCardProps) {
  return (
    <Card {...props}>
      <Text style={{ textAlign: 'right' }}>{props.bpPoints} PTS</Text>
      <BoldText>{props.eventName}</BoldText>
      <Text>
        {props.startTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}{' '}
        -{' '}
        {props.endTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
      <Text>{props.location}</Text>
    </Card>
  );
}

export default EventCard;

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
`;
