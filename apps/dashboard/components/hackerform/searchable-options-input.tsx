import { Colors2023 } from '@hacksc-platforms/styles';
import { HackformQuestionResponse, Option } from '@hacksc-platforms/types';
import { Text } from '@hacksc-platforms/ui';
import {
  Button,
  SearchableOptionSelectInput,
} from '@hacksc-platforms/ui-kit-2023';
import { useState } from 'react';
import styled from 'styled-components';
import { QuestionFormProps } from './hackform-question';

type SearchableOptionsInputProps = QuestionFormProps & {
  options: Option[];
  initialError?: string; // for passing in default error
};

const SearchableOptionsInput = ({
  currentResponses: { responses },
  question,
  initialError,
  options,
  qi,
  resolveError,
  addErrorForQuestion,
  saveResponse,
  goNextQuestion,
}: SearchableOptionsInputProps) => {
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

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const input: HackformQuestionResponse['input'] = {
      singleChoiceValue: chosenOption?.value,
      text: textInput,
    };
    const { valid, errorDescription } = question.validationFunction(input);
    saveResponse({ input });
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

  return (
    <Wrapper>
      <InputAndButtonWrapper>
        <SearchableOptionSelectInput
          onChange={handleInputChange}
          onClickChooseOption={handleChooseOptionFromDropdown}
          options={options}
          value={textInput}
        />
        <Button color="black" onClick={handleSubmit}>
          OK
        </Button>
        <SmallText>press Enter</SmallText>
      </InputAndButtonWrapper>
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default SearchableOptionsInput;

const InputAndButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorText = styled(Text)`
  color: ${Colors2023.RED.STANDARD};
`;

const SmallText = styled(Text)`
  font-size: small;
`;
