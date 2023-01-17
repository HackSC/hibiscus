import { Checkbox, OneLineText } from '@hibiscus/ui-kit-2023';
import { GetInputResponseCb } from '../../../common/types';
import React, { useState } from 'react';
import QuestionCreator from '../question-creator/question-creator';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import styled from 'styled-components';
import { Option } from '@hibiscus/types';
import { DEFAULT_OTHERS_FIELD_LABEL } from '../../../common/constants';

export interface MultiSelectQuestionProps {
  options: Option[];
}

export const MultiSelectQuestion = (props: MultiSelectQuestionProps) => {
  const { ...hackformUtils } = useHackform();
  const initialInput = hackformUtils.getCurrentResponse()?.input;
  const [values, setValues] = useState<string[]>(initialInput?.choices ?? []);
  const [other, setOther] = useState<Option | null>(
    initialInput && initialInput.singleChoiceValue === ''
      ? {
          displayName: initialInput?.text,
          value: initialInput?.singleChoiceValue,
        }
      : null
  );

  const createCbHandleOnCheck = (item: Option) => (newValue: boolean) => {
    if (newValue) {
      // add to selections if not already in (for security)
      setValues((prev) => {
        const newPrev = [...prev];
        if (!prev.find((chosen) => chosen === item.value)) {
          newPrev.push(item.value);
        }
        return newPrev;
      });
    } else {
      // remove item from choices
      setValues((prev) => prev.filter((val) => val !== item.value));
    }
  };

  const handleClickOthers = (newVal: boolean) => {
    if (!newVal) {
      // uncheck
      setOther(null);
      return;
    }
    setOther({
      value: '',
      displayName: other?.displayName,
    });
  };

  const handleChangeOthersText: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const input = e.target.value;
    setOther((prev) => ({ ...prev, displayName: input }));
  };

  const question = hackformUtils.getCurrentQuestion();

  const InputComponent = (
    <Wrapper>
      {Array.isArray(question.options) &&
        question.options.map((item, i) => (
          <Checkbox
            label={item.displayName}
            key={i}
            onInput={createCbHandleOnCheck(item)}
            checked={values.includes(item.value)}
            disabled={other !== null} // disable if picked Others
          />
        ))}
      {question.hasOtherField && (
        <OtherWrapper>
          <Checkbox
            label={question.otherFieldLabel ?? DEFAULT_OTHERS_FIELD_LABEL}
            checked={other !== null} // when this option was picked
            onInput={handleClickOthers}
          />
          <StyledOneLineText
            value={other?.displayName}
            disabled={other === null} // disable when didn't pick Others
            onChange={handleChangeOthersText}
          />
        </OtherWrapper>
      )}
    </Wrapper>
  );

  const getInputResponse: GetInputResponseCb = () => {
    if (other !== null) {
      return { singleChoiceValue: other.value, text: other.displayName };
    }
    return { choices: values };
  };

  return (
    <QuestionCreator
      inputComponentChildren={InputComponent}
      getInputResponse={getInputResponse}
      submitButtonUnder
    />
  );
};

export default MultiSelectQuestion;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OtherWrapper = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 400px) {
    flex-direction: column;
    padding-bottom: 2rem;
  }
`;

const StyledOneLineText = styled(OneLineText)`
  margin-top: -1rem;
`;
