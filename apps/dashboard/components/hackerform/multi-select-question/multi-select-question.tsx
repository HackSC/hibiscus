import { Checkbox } from '@hibiscus/ui-kit-2023';
import { GetInputResponseCb } from '../../../common/types';
import React, { useState } from 'react';
import QuestionCreator from '../question-creator/question-creator';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import styled from 'styled-components';
import { Option } from '@hibiscus/types';

export interface MultiSelectQuestionProps {
  options: Option[];
}

export const MultiSelectQuestion = (props: MultiSelectQuestionProps) => {
  const { ...hackformUtils } = useHackform();
  const initialInput = hackformUtils.getCurrentResponse()?.input;
  const [values, setValues] = useState<string[]>(initialInput?.choices ?? []);

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

  const question = hackformUtils.getCurrentQuestion();
  const InputComponent = (
    <Wrapper>
      {question.options.map((item, i) => (
        <Checkbox
          label={item.displayName}
          key={i}
          onInput={createCbHandleOnCheck(item)}
          checked={values.includes(item.value)}
        />
      ))}
    </Wrapper>
  );

  const getInputResponse: GetInputResponseCb = () => ({ choices: values });

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
