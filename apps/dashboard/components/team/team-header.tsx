import { Colors2023 } from '@hibiscus/styles';
import { H1, Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { useTeam } from '../../hooks/use-team/use-team';
import React from 'react';
import styled from 'styled-components';

function TeamHeader() {
  const { team } = useTeam();
  return (
    <Container>
      <NameBioContainer>
        <NameDiv>
          <GraySpan>Team:</GraySpan>{' '}
          <H1>
            <GlowSpan
              color={Colors2023.BLUE.STANDARD}
              shadowColor={Colors2023.BLUE.DARK}
            >
              {team.name}
            </GlowSpan>
          </H1>
        </NameDiv>
        <BioDiv>
          <GraySpan>Description:</GraySpan>
          <Text>{team.description}</Text>
        </BioDiv>
      </NameBioContainer>
    </Container>
  );
}

export default TeamHeader;

const Container = styled.div`
  display: flex;
`;

const NameDiv = styled.div``;

const BioDiv = styled.div``;

const NameBioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const GraySpan = styled.span`
  color: ${Colors2023.GRAY.SCHEMDIUM};
`;
