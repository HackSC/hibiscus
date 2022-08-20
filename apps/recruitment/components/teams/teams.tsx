import styled from 'styled-components';
import { H2, Text } from '@hacksc-platforms/ui';
/* eslint-disable-next-line */
export interface TeamsProps {}

export function Teams(props: TeamsProps) {
  return (
    <StyledTeams>
      <TeamsHeaderH2>Our Teams</TeamsHeaderH2>
      <GrayParagraph>
        Click on any card to learn more about each team!
      </GrayParagraph>
    </StyledTeams>
  );
}

export default Teams;

const StyledTeams = styled.div`
  color: pink;
`;
const TeamsHeaderH2 = styled(H2)`
  font-size: 4.25rem;
  font-weight: 600;
  color: #2b2b2b;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const GrayParagraph = styled(Text)`
  font-weight: 400;
  color: #939393;
  margin: 10px 3px;
  font-size: 1.2rem;

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;
