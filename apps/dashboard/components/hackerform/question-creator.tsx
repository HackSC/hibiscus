import { Button } from '@hibiscus/ui-kit-2023';
import {
  ButtonHintTextContainer,
  ErrorText,
  InputAndButtonWrapper,
  PageWrapper,
  QuestionWrapper,
  SmallText,
} from './common-styled-components';
import HackformQuestionHeader from './hackform-question-header';
import HackformBackNextWidget from './hackform-backnext-widget';
import { FormQuestion } from '@hibiscus/types';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import styled from 'styled-components';

interface QuestionCreatorProps {
  inputComponentChildren: React.ReactNode;
  question: FormQuestion;
  qi: number;
  handleSubmitWithValidation: React.MouseEventHandler<HTMLButtonElement>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  error?: string;
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
}: QuestionCreatorProps) => {
  return (
    <PageWrapper>
      <QuestionWrapper>
        <HackformQuestionHeader question={question} qi={qi} />
        <IBWrapperOverride submitButtonUnder={submitButtonUnder}>
          {inputComponentChildren}
          <ButtonHintTextContainer>
            <Button color="black" onClick={handleSubmitWithValidation}>
              OK
            </Button>
            <SmallText>press Enter</SmallText>
            <IoReturnDownBackOutline />
          </ButtonHintTextContainer>
        </IBWrapperOverride>
        <ErrorText>{error}</ErrorText>
      </QuestionWrapper>
      <HackformBackNextWidget
        goNextQuestion={goNextQuestion}
        goPreviousQuestion={goPreviousQuestion}
      />
    </PageWrapper>
  );
};

export default QuestionCreator;

const IBWrapperOverride = styled(ButtonHintTextContainer)<{
  submitButtonUnder?: boolean;
}>`
  flex-direction: ${(props) => (props.submitButtonUnder ? 'column' : 'row')};
  align-items: ${(props) =>
    props.submitButtonUnder ? 'flex-start' : 'center'};
`;
