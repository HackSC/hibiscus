import styled from 'styled-components';

/* eslint-disable-next-line */
export interface VerticalsProps {}

const StyledVerticals = styled.div`
  color: pink;
`;

export function Verticals(props: VerticalsProps) {
  return (
    <StyledVerticals>
      <h1>Welcome to Verticals!</h1>
    </StyledVerticals>
  );
}

export default Verticals;
