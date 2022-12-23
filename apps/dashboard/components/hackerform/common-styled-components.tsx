import { Colors2023 } from '@hacksc-platforms/styles';
import { Text } from '@hacksc-platforms/ui';
import styled from 'styled-components';

export const InputAndButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  height: 100%;
`;

export const ErrorText = styled(Text)`
  color: ${Colors2023.RED.STANDARD};
`;

export const SmallText = styled(Text)`
  font-size: small;
`;

export const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ButtonHintTextContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
