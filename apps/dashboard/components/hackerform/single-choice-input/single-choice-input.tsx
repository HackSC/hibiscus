import { Option } from '@hibiscus/types';
import { OneLineText, Radio } from '@hibiscus/ui-kit-2023';
import { GetInputResponseCb } from '../../../common/types';
import { useState } from 'react';
import styled from 'styled-components';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import QuestionCreator from '../question-creator/question-creator';
import { OtherField } from '../other-field';

interface SingleChoiceInputProps {
  options: Option[];
  hasOtherField?: boolean;
}

export const SingleChoiceInput = (props: SingleChoiceInputProps) => {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();
  const initInput = hackformUtils.getCurrentResponse()?.input;
  const [chosenOption, setChosenOption] = useState<Option | null>(
    initInput
      ? { displayName: initInput?.text, value: initInput?.singleChoiceValue }
      : null
  );

  const getInputResponse: GetInputResponseCb = () => ({
    text: chosenOption?.displayName,
    singleChoiceValue: chosenOption?.value,
  });

  const handleChangeValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === '') {
      // other field
      setChosenOption({ displayName: '', value: e.target.value });
      return;
    }
    setChosenOption({ displayName: e.target.name, value: e.target.value });
  };

  const handleInputOther: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChosenOption((prev) => ({ ...prev, displayName: e.target.value }));
  };

  const InputComponent = (
    <Wrapper>
      {props.options.map((item) => {
        return (
          <Radio
            key={item.value}
            name={item.displayName}
            value={item.value}
            onChange={handleChangeValue}
            label={item.displayName}
            checked={chosenOption?.value === item.value}
          />
        );
      })}
      {props.hasOtherField && (
        <OtherField
          handleChangeValue={handleChangeValue}
          handleInputOther={handleInputOther}
          checked={chosenOption?.value === ''}
          disabledTextInput={chosenOption?.value !== ''}
          valueTextInput={
            chosenOption?.value === '' ? chosenOption?.displayName : ''
          }
        />
      )}
    </Wrapper>
  );

  return (
    <QuestionCreator
      inputComponentChildren={InputComponent}
      getInputResponse={getInputResponse}
      submitButtonUnder
    />
  );
};

const Wrapper = styled.div``;
