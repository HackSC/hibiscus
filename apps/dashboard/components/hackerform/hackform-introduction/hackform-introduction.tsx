import { H1, H3, Text } from '@hibiscus/ui';
import { HackformMetadata } from '@hibiscus/types';
import styled from 'styled-components';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';

interface Props {
  formMetadata: HackformMetadata;
  onClick: () => void;
}

export const HackformIntroduction = ({ formMetadata, onClick }: Props) => {
  return (
    <IntroductionWrapper>
      <Heading>
        <GlowSpan
          color={Colors2023.BLUE.LIGHT}
          shadowColor={Colors2023.BLUE.STANDARD}
        >
          {formMetadata.entry.title}
        </GlowSpan>
      </Heading>
      <H3>{formMetadata.entry.subtitle}</H3>
      <ButtonWrapper>
        <Button color="black" onClick={onClick}>
          START
        </Button>
        {formMetadata.entry.estTimeInMinutes && (
          <SmallText>
            Takes {formMetadata.entry.estTimeInMinutes} minutes.
          </SmallText>
        )}
      </ButtonWrapper>
    </IntroductionWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`;

export default HackformIntroduction;

const IntroductionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const SmallText = styled(Text)`
  font-size: 14px;
`;

const Heading = styled(H1)`
  font-weight: 500;
  letter-spacing: -2px;
`;
