import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HackSCMemoriesProps {}

const StyledHackSCMemories = styled.div`
  color: pink;
`;

export function HackSCMemories(props: HackSCMemoriesProps) {
  return (
    <StyledHackSCMemories>
      <h1>Welcome to HackSCMemories!</h1>
    </StyledHackSCMemories>
  );
}

export default HackSCMemories;
