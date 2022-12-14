import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CheckInProps {}

const StyledCheckIn = styled.div`
  background-color: #d9d9d9;
  width: 70%;
`;

export function CheckIn(props: CheckInProps) {
  return <StyledCheckIn></StyledCheckIn>;
}

export default CheckIn;
