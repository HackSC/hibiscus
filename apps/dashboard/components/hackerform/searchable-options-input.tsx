import { Colors2023 } from '@hibiscus/styles';
import { HackformQuestionResponse, Option } from '@hibiscus/types';
import { Text } from '@hibiscus/ui';
import { SearchableOptionSelectInput } from '@hibiscus/ui-kit-2023';
import { useState } from 'react';
import styled from 'styled-components';
import { QuestionFormProps } from './hackform-question';
import QuestionCreator from './QuestionCreator';

type SearchableOptionsInputProps = QuestionFormProps & {
  options: Option[];
  initialError?: string; // for passing in default error
};

const SearchableOptionsInput = (props: SearchableOptionsInputProps) => {
  const {
    currentResponses: { responses },
    question,
    initialError,
    options,
    qi,
    resolveError,
    addErrorForQuestion,
    saveResponse,
    goNextQuestion,
    goPreviousQuestion,
  } = props;
  const currentInput = responses[qi]?.input;

  const [textInput, setTextInput] = useState(currentInput?.text ?? '');
  const [chosenOption, setChosenOption] = useState<Option | null>(
    currentInput?.singleChoiceValue
      ? {
          value: currentInput.singleChoiceValue,
          displayName: currentInput?.text,
        }
      : null
  );
  const [error, setError] = useState(initialError ?? '');

  const getResponse = (): HackformQuestionResponse => ({
    input: {
      singleChoiceValue: chosenOption?.value,
      text: textInput,
    },
  });

  const handleSubmitValidate = () => {
    const response = getResponse();
    const { valid, errorDescription } = question.validationFunction(
      response.input
    );
    saveResponse(response);
    if (!valid) {
      setError(errorDescription);
      addErrorForQuestion(qi, errorDescription);
      return;
    }
    resolveError(qi);
    goNextQuestion();
  };

  const handleChooseOptionFromDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: Option
  ) => {
    e.preventDefault();
    setChosenOption(option);
    setTextInput(option.displayName);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTextInput(e.target.value);
  };

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

  const InputComponent = (
    <SearchableOptionSelectInput
      onChange={handleInputChange}
      onClickChooseOption={handleChooseOptionFromDropdown}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSubmitValidate();
        }
      }}
      options={options}
      value={textInput}
    />
  );

  return (
    <QuestionCreator
      {...props}
      goPreviousQuestion={goPrevQuestionValidateSilently}
      goNextQuestion={goNextQuestionValidateSilently}
      inputComponentChildren={InputComponent}
      handleSubmitWithValidation={handleSubmitValidate}
      error={error}
    />
  );
};

export default SearchableOptionsInput;
