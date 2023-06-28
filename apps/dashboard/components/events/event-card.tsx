import styled from 'styled-components';

interface EventCardProps {
  // CSS values for absolute position (percentage, px, etc.)
  width: string;
  height: string;
  top: string;
  left: string;
}

function EventCard(props: EventCardProps) {
  return <Card {...props}></Card>;
}

export default EventCard;

const Card = styled.div<EventCardProps>`
  position: absolute;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  top: ${(props) => props.top};
  left: ${(props) => props.left};

  background-color: #336675;
`;
