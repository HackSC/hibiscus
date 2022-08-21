import styled from 'styled-components';
import { H2 } from '@hacksc-platforms/ui';

/* eslint-disable-next-line */
export interface HackSCMemoriesProps {}

const StyledHackSCMemories = styled.div`
  color: pink;
`;

export function HackSCMemories(props: HackSCMemoriesProps) {
  return (
    <StyledHackSCMemories>
      <MemosHeaderH2>HackSC Memories</MemosHeaderH2>
    </StyledHackSCMemories>
  );
}

const MemosHeaderH2 = styled(H2)`
  font-size: 4.25rem;
  font-weight: 600;
  color: #2b2b2b;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

export default HackSCMemories;
