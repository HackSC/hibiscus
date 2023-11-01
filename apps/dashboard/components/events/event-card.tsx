import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Text } from '@hibiscus/ui';
import { Event } from '../../common/events.utils';
import styled from 'styled-components';

interface EventCardProps {
  event: Event;
  openModal: (eventId: string) => void;
}

export function EventCard(props: EventCardProps) {
  const date = props.event.startTime.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  const startTime = props.event.startTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = props.event.endTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card onClick={() => props.openModal(props.event.eventId)}>
      <CardLeft>
        <BoldText>{date}</BoldText>
      </CardLeft>

      <CardRight>
        <Row>
          <BoldText style={{ color: 'black' }}>
            {props.event.eventName}
          </BoldText>
          <BoldText style={{ color: 'black', fontSize: '0.75rem' }}>
            {props.event.bpPoints} PTS
          </BoldText>
        </Row>
        <Text style={{ color: '#CE0C0A', fontSize: '0.75rem' }}>
          {startTime} - {endTime}
        </Text>
        <Text style={{ color: '#CE0C0A', fontSize: '0.75rem' }}>
          {props.event.location}
        </Text>
      </CardRight>
    </Card>
  );
}

export default EventCard;

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;

  align-items: center;

  border-radius: 10px;

  overflow: hidden;

  cursor: pointer;
  max-width: 30vw;
  min-height: 21vh;
`;

const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #ce0c0a;

  padding: 1rem;

  height: 100%;
`;

const CardRight = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fef8e5;

  padding: 1rem;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
