import { H1, H4, Text } from '@hacksc-platforms/ui';
import { FormMetadata } from '../../common/form';
import styled from 'styled-components';
import { Button } from '@hacksc-platforms/ui-kit-2023';

interface Props {
  formMetadata: FormMetadata;
  onClick: () => void;
}

const Introduction = ({ formMetadata, onClick }: Props) => {
  return (
    <IntroductionWrapper>
      <H1>{formMetadata.entry.title}</H1>
      <H4>{formMetadata.entry.subtitle}</H4>
      <div>
        <Button color="blue" onClick={onClick}>
          START
        </Button>
        {formMetadata.entry.estTimeInMinutes && (
          <SmallText>
            Takes {formMetadata.entry.estTimeInMinutes} minutes.
          </SmallText>
        )}
      </div>
    </IntroductionWrapper>
  );
};

export default Introduction;

const IntroductionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const SmallText = styled(Text)`
  font-size: 12px;
`;
