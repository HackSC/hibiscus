import { Colors2023 } from '@hibiscus/styles';
import { H1, Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import React from 'react';
import styled from 'styled-components';

function TeamHeader() {
  const teamName = 'Awesome';
  const teamBio =
    'asjdlasjda sdioasod aosid joaisdjoia doiasdo aosd oasdoa da sd oasd\n hello guys';
  return (
    <Container>
      <NameBioContainer>
        <NameDiv>
          <GraySpan>Team:</GraySpan>{' '}
          <H1>
            <GlowSpan
              color={Colors2023.GREEN.STANDARD}
              shadowColor={Colors2023.GREEN.DARK}
            >
              {teamName}
            </GlowSpan>
          </H1>
        </NameDiv>
        <BioDiv>
          <GraySpan>Description:</GraySpan>
          <Text>{teamBio}</Text>
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
