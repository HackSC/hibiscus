import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SomeComponentLolProps {}

const StyledSomeComponentLol = styled.div`
  color: pink;
`;

export function SomeComponentLol(props: SomeComponentLolProps) {
  return (
    <StyledSomeComponentLol>
      <h1>Welcome to SomeComponentLol!</h1>
    </StyledSomeComponentLol>
  );
}

export default SomeComponentLol;
