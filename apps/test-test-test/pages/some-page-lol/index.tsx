import styled from 'styled-components';
import SomeComponentLol from '../../components/some-component-lol/some-component-lol';

/* eslint-disable-next-line */
export interface SomePageLolProps {}

const StyledSomePageLol = styled.div`
  color: pink;
`;

export function SomePageLol(props: SomePageLolProps) {
  return (
    <StyledSomePageLol>
      <SomeComponentLol />
      <h1>Welcome to SomePageLol!</h1>
    </StyledSomePageLol>
  );
}

export default SomePageLol;
