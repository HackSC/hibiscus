import React, { useState } from 'react';
import { OneLineText } from '@hacksc-platforms/ui-kit-2023';
import { QuestionFormProps } from './hackform-question';
import QuestionCreator from './QuestionCreator';
import { HackformQuestionResponse } from '@hacksc-platforms/types';

type Props = QuestionFormProps & { placeholder: string; initialError?: string };

const ShortTextInput = (props: Props) => {
  const {
    question,
    saveResponse,
    goNextQuestion,
    goPreviousQuestion,
    currentResponses,
    addErrorForQuestion,
    resolveError,
    qi,
    placeholder,
    initialError,
  } = props;
  const [error, setError] = useState(initialError ?? '');
  const [textInput, setInput] = useState(
    currentResponses.responses[qi]?.input.text ?? ''
  );

  const getInputResponse = (): HackformQuestionResponse['input'] => ({
    text: textInput,
  });

  const handleSubmitWithValidation = () => {
    const input = getInputResponse();
    const { valid, errorDescription } = question.validationFunction(input);

    saveResponse({ input });
    if (valid) {
      resolveError(qi);
      goNextQuestion();
    } else {
      setError(errorDescription);
      addErrorForQuestion(qi, errorDescription);
    }
  };

  const goNextQuestionValidateSilently = () => {
    const input = getInputResponse();
    const { valid, errorDescription } = question.validationFunction(input);
    if (!valid) addErrorForQuestion(qi, errorDescription);
    else resolveError(qi);
    // go next regardless
    saveResponse({ input });
    goNextQuestion();
  };

  const goPrevQuestionValidateSilently = () => {
    const input = getInputResponse();
    const { valid, errorDescription } = question.validationFunction(input);
    if (!valid) addErrorForQuestion(qi, errorDescription);
    else resolveError(qi);
    // go previous regardless
    saveResponse({ input });
    goPreviousQuestion();
  };

  const InputComponent = (
    <OneLineText
      value={textInput}
      placeholder={placeholder}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSubmitWithValidation();
        }
      }}
    />
  );

  return (
    <QuestionCreator
      goNextQuestion={goNextQuestionValidateSilently}
      goPreviousQuestion={goPrevQuestionValidateSilently}
      qi={qi}
      question={question}
      handleSubmitWithValidation={handleSubmitWithValidation}
      inputComponentChildren={InputComponent}
      error={error}
    />
  );
};

export default ShortTextInput;
