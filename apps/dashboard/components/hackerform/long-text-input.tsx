import React, { useState } from 'react';
import { Button, ParagraphText } from '@hibiscus/ui-kit-2023';
import { QuestionFormProps } from './hackform-question';
import {
  ErrorText,
  InputAndButtonWrapper,
  PageWrapper,
  QuestionWrapper,
  SmallText,
  ButtonHintTextContainer,
} from './common-styled-components';
import HackformQuestionHeader from './hackform-question-header';
import HackformBackNextWidget from './hackform-backnext-widget';
import styled from 'styled-components';

type Props = QuestionFormProps & { placeholder: string; initialError?: string };

const LongTextQuestion = ({
  question,
  addErrorForQuestion,
  resolveError,
  saveResponse,
  goNextQuestion,
  goPreviousQuestion,
  currentResponses: { responses },
  qi,
  placeholder,
  initialError,
}: Props) => {
  const [error, setError] = useState(initialError ?? '');
  const [textInput, setInput] = useState(responses[qi]?.input.text ?? '');

  const handleSubmitWithValidation = () => {
    const input = { text: textInput };
    const { valid, errorDescription } = question.validationFunction(input);
    // save responses regardless (so that when user revisit question they will
    // still have the previous response).
    saveResponse({ input });
    if (!valid) {
      setError(errorDescription);
      addErrorForQuestion(qi, errorDescription);
    } else {
      resolveError(qi);
      goNextQuestion();
    }
  };

  const getResponse = () => ({ input: { text: textInput } });

  const goNextQuestionValidateSilently = () => {
    const response = getResponse();
    const { valid, errorDescription } = question.validationFunction(
      response.input
    );
    if (!valid) addErrorForQuestion(qi, errorDescription);
    else resolveError(qi);
    // go next regardless
    saveResponse(response);
    goNextQuestion();
  };

  const goPrevQuestionValidateSilently = () => {
    const response = getResponse();
    const { valid, errorDescription } = question.validationFunction(
      response.input
    );
    if (!valid) addErrorForQuestion(qi, errorDescription);
    else resolveError(qi);
    // go previous regardless
    saveResponse(response);
    goPreviousQuestion();
  };

  const inputComponent = (
    <ParagraphText
      style={{ width: '50rem' }}
      value={textInput}
      placeholder={placeholder}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          handleSubmitWithValidation();
          return;
        }
        e.preventDefault();
      }}
    />
  );

  return (
    <PageWrapper>
      <QuestionWrapper>
        <HackformQuestionHeader question={question} qi={qi} />
        <InputAndButtonWrapperOverride>
          {inputComponent}
          <ButtonHintTextContainer>
            <Button color="black" onClick={handleSubmitWithValidation}>
              OK
            </Button>
            <SmallText>press Enter.</SmallText>
          </ButtonHintTextContainer>
        </InputAndButtonWrapperOverride>
        <ErrorText>{error}</ErrorText>
      </QuestionWrapper>
      <HackformBackNextWidget
        goNextQuestion={goNextQuestionValidateSilently}
        goPreviousQuestion={goPrevQuestionValidateSilently}
      />
    </PageWrapper>
  );
};

export default LongTextQuestion;

const InputAndButtonWrapperOverride = styled(InputAndButtonWrapper)`
  flex-direction: column;
  align-items: flex-start;
`;
