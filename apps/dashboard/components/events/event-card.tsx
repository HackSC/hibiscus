import { Colors2023 } from '@hibiscus/styles';
import { BoldText, Text } from '@hibiscus/ui';
import styled from 'styled-components';

interface EventCardProps {
  eventId: number;
  eventName: string;
  startTime: Date;
  endTime: Date;
  location: string;
  bpPoints: number;
  openModal: (eventId: number) => void;
}

export function EventCard(props: EventCardProps) {
  const date = props.startTime.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  const startTime = props.startTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = props.endTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card onClick={() => props.openModal(props.eventId)}>
      <CardLeft>
        <BoldText>{date}</BoldText>
      </CardLeft>

      <CardRight>
        <Row>
          <BoldText style={{ color: '#336675' }}>{props.eventName}</BoldText>
          <BoldText style={{ color: 'black', fontSize: '0.75rem' }}>
            {props.bpPoints} PTS
          </BoldText>
        </Row>
        <Text style={{ color: Colors2023.GRAY.MEDIUM, fontSize: '0.75rem' }}>
          {startTime} - {endTime}
        </Text>
        <Text style={{ color: Colors2023.GRAY.MEDIUM, fontSize: '0.75rem' }}>
          {props.location}
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

  border: 2px solid ${Colors2023.GRAY.SCHEMDIUM};
  border-radius: 15px;

  overflow: hidden;

  cursor: pointer;
`;

const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #336675;

  padding: 1rem;

  height: 100%;
`;

const CardRight = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${Colors2023.GRAY.LIGHT};

  padding: 1rem;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
