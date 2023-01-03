import styled from 'styled-components';
import { FlipCard } from '@hibiscus/ui';

/* eslint-disable-next-line */
export interface VerticalsProps {}

export function Verticals(props: VerticalsProps) {
  return (
    <StyledVerticals>
      <h1>Welcome to Verticals!</h1>
      <FlipCard front="hello" back="bye" />
    </StyledVerticals>
  );
}

export default Verticals;

const StyledVerticals = styled.div`
  color: pink;
`;
