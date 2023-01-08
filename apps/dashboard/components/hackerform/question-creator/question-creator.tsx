import { Button } from '@hibiscus/ui-kit-2023';
import HackformQuestionHeader from '../hackform-question-header/hackform-question-header';
import HackformBackNextWidget from '../hackform-backnext-widget/hackform-backnext-widget';
import { HackformQuestion, HackformError } from '@hibiscus/types';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { GetInputResponseCb } from '../../../common/types';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import { Colors2023 } from '@hibiscus/styles';
import { Text } from '@hibiscus/ui';

interface QuestionCreatorProps {
  inputComponentChildren: React.ReactNode;
  getInputResponse: GetInputResponseCb;
  question?: HackformQuestion;
  qi?: number;
  handleSubmitWithValidation?: React.MouseEventHandler<HTMLButtonElement>;
  goNextQuestion?: () => void;
  goPreviousQuestion?: () => void;
  error?: HackformError;
  submitButtonUnder?: boolean;
}

export const QuestionCreator = ({
  submitButtonUnder,
  inputComponentChildren,
  question,
  qi,
  handleSubmitWithValidation,
  goNextQuestion,
  goPreviousQuestion,
  error,
  getInputResponse,
}: QuestionCreatorProps) => {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();

  const ErrorChildren = () => {
    const currentError: HackformError =
      error ?? hackformUtils.getCurrentError();
    if (typeof currentError === 'string') {
      return <ErrorText>{currentError}</ErrorText>;
    } else if (Array.isArray(currentError)) {
      return (
        <ul>
          {currentError.map((err, i) => (
            <ErrorText key={i}>
              <li>{err}</li>
            </ErrorText>
          ))}
        </ul>
      );
    } else {
      // don't know what to do here but just renders it
      return <ErrorText>{currentError}</ErrorText>;
    }
  };

  return (
    <PageWrapper>
      <QuestionWrapper>
        <HackformQuestionHeader
          question={question ?? hackformUtils.getCurrentQuestion()}
          qi={qi ?? currentQuestionIndex}
        />
        <InputAndButtonWrapper submitButtonUnder={submitButtonUnder}>
          {inputComponentChildren}
          <ButtonHintTextContainer>
            <Button
              color="black"
              onClick={
                handleSubmitWithValidation ??
                hackformUtils.createCbSubmitValidate(getInputResponse)
              }
            >
              OK
            </Button>
            <SmallText>press Enter</SmallText>
            <IoReturnDownBackOutline />
          </ButtonHintTextContainer>
        </InputAndButtonWrapper>
        <ErrorContainer>
          <ErrorChildren />
        </ErrorContainer>
      </QuestionWrapper>
      <HackformBackNextWidget
        goNextQuestion={
          goNextQuestion ??
          hackformUtils.createCbGoNextQuestionValidateSilently(getInputResponse)
        }
        goPreviousQuestion={
          goPreviousQuestion ??
          hackformUtils.createCbGoPrevQuestionValidateSilently(getInputResponse)
        }
      />
    </PageWrapper>
  );
};

export default QuestionCreator;

const InputAndButtonWrapper = styled.div<{
  submitButtonUnder?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: ${(props) => (props.submitButtonUnder ? 'column' : 'row')};
  align-items: ${(props) =>
    props.submitButtonUnder ? 'flex-start' : 'center'};
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  height: 100%;
`;

const ErrorText = styled(Text)`
  color: ${Colors2023.RED.STANDARD};
`;

const SmallText = styled(Text)`
  font-size: small;
`;

const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonHintTextContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
