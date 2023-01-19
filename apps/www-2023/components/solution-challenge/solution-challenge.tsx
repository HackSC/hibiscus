import styled from 'styled-components';
import { H3, Label, Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
/* eslint-disable-next-line */
export interface SolutionChallengeProps {}

export function SolutionChallenge(props: SolutionChallengeProps) {
  return (
    <StyledSolutionChallenge>
      <Label>
        <GlowSpan
          color={Colors2023.GRAY.LIGHT}
          shadowColor={Colors2023.YELLOW.STANDARD}
        >
          Solution Challenge
        </GlowSpan>
      </Label>
      <H3>Building Up Our Local Community</H3>
      <Blurb>
        The Solution Challenge aims to mobilize our hackers&apos; potential to
        aid our community by tackling issues that local nonprofits face with
        technological solutions. The winners of this challenge will be awarded a
        prize to make their project a reality that our partner nonprofits can
        implement.
      </Blurb>
    </StyledSolutionChallenge>
  );
}

export default SolutionChallenge;

const StyledSolutionChallenge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin-bottom: 5rem;
`;

const Blurb = styled(Text)`
  text-align: center;
  margin: 2rem 7rem;
  @media (max-width: 800px) {
    margin: 2rem 3rem;
  }
`;
