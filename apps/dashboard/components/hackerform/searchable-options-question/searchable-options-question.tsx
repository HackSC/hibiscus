import { HackformQuestion, Option } from '@hibiscus/types';
import { Combobox } from '@hibiscus/ui-kit-2023';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import { useState } from 'react';
import QuestionCreator from '../question-creator/question-creator';

type SearchableOptionsInputProps = {
  options: HackformQuestion['options'];
  initialError?: string; // for passing in default error
};

export const SearchableOptionsInput = (props: SearchableOptionsInputProps) => {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();
  const currentInput = hackformUtils.getCurrentResponse()?.input;
  const question = hackformUtils.getCurrentQuestion();
  const [textInput, setTextInput] = useState(currentInput?.text ?? '');
  const [chosenOption, setChosenOption] = useState<Option | null>(
    currentInput?.singleChoiceValue
      ? {
          value: currentInput.singleChoiceValue,
          displayName: currentInput?.text,
        }
      : null
  );

  const getInputResponse = () => ({
    singleChoiceValue: chosenOption?.value,
    text: textInput,
  });

  const handleChooseOptionFromDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: Option
  ) => {
    setChosenOption(option);
    setTextInput(option.displayName);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTextInput(e.target.value);
  };

  const InputComponent = (
    <Combobox
      onChange={handleInputChange}
      limitDropdownItems={question.limitOptions}
      onClickChooseOption={handleChooseOptionFromDropdown}
      placeholder={question.placeholder}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const cb = hackformUtils.createCbSubmitValidate(getInputResponse);
          cb();
        }
      }}
      options={props.options}
      value={textInput}
    />
  );

  return (
    <QuestionCreator
      getInputResponse={getInputResponse}
      inputComponentChildren={InputComponent}
    />
  );
};

export default SearchableOptionsInput;
