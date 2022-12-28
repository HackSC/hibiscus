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

interface QuestionCreatorProps {
  inputComponentChildren: React.ReactNode;
  question: FormQuestion;
  qi: number;
  handleSubmitWithValidation: React.MouseEventHandler<HTMLButtonElement>;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  error?: string;
}

const QuestionCreator = ({
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
        <InputAndButtonWrapper>
          {inputComponentChildren}
          <ButtonHintTextContainer>
            <Button color="black" onClick={handleSubmitWithValidation}>
              OK
            </Button>
            <SmallText>press Enter.</SmallText>
          </ButtonHintTextContainer>
        </InputAndButtonWrapper>
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
