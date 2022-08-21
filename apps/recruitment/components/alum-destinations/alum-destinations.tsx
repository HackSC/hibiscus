import styled from 'styled-components';

/* eslint-disable-next-line */
export interface AlumDestinationsProps {}

const StyledAlumDestinations = styled.div`
  color: pink;
`;

export function AlumDestinations(props: AlumDestinationsProps) {
  return (
    <StyledAlumDestinations>
      <h1>Welcome to AlumDestinations!</h1>
    </StyledAlumDestinations>
  );
}

export default AlumDestinations;
