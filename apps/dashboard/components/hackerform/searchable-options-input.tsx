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
  error?: string; // for passing in default error
};

const SearchableOptionsInput = (props: SearchableOptionsInputProps) => {
  const [textInput, setTextInput] = useState('');
  const [chosenOption, setChosenOption] = useState<Option | null>(null);
  const [error, setError] = useState(props.error ?? '');

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const input: HackformQuestionResponse['input'] = {
      singleChoiceValue: chosenOption?.value,
      text: chosenOption?.displayName ?? textInput,
    };
    const { valid, errorDescription } =
      props.question.validationFunction(input);
    if (!valid) {
      setError(errorDescription);
      props.addErrorForQuestion(props.qi, errorDescription);
      return;
    }
    props.onClickSubmit({
      question: props.question,
      input,
    });
    props.onClickNext();
    props.resolveError(props.qi);
  };

  const handleChooseOptionFromDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: Option
  ) => {
    e.preventDefault();
    setChosenOption(option);
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
          options={props.options}
        />
        <Button color="black" onClick={handleSubmit}>
          OK
        </Button>
        <SmallText>press Enter</SmallText>
      </InputAndButtonWrapper>
      {error !== '' && <ErrorText>{error}</ErrorText>}
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
