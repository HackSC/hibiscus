import { Button } from '@hibiscus/ui-kit-2023';
import {
  ButtonHintTextContainer,
  ErrorText,
  InputAndButtonWrapper,
  PageWrapper,
  QuestionWrapper,
  SmallText,
} from '../common-styled-components';
import HackformQuestionHeader from '../hackform-question-header/hackform-question-header';
import HackformBackNextWidget from '../hackform-backnext-widget/hackform-backnext-widget';
import { HackformQuestion, HackformError } from '@hibiscus/types';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { GetInputResponseCb } from '../../../common/types';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';

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
        <IBWrapperOverride submitButtonUnder={submitButtonUnder}>
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
        </IBWrapperOverride>
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

const IBWrapperOverride = styled(InputAndButtonWrapper)<{
  submitButtonUnder?: boolean;
}>`
  flex-direction: ${(props) => (props.submitButtonUnder ? 'column' : 'row')};
  align-items: ${(props) =>
    props.submitButtonUnder ? 'flex-start' : 'center'};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
