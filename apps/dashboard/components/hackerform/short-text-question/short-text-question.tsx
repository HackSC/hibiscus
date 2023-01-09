import React, { useState } from 'react';
import { OneLineText } from '@hibiscus/ui-kit-2023';
import QuestionCreator from '../question-creator/question-creator';
import { GetInputResponseCb } from '../../../common/types';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';

type Props = { placeholder: string };

export const ShortTextInput = ({ placeholder }: Props) => {
  const { currentQuestionIndex, responses, ...hackformUtils } = useHackform();
  const currentInput = hackformUtils.getCurrentResponse()?.input;
  const [textInput, setInput] = useState(currentInput?.text ?? '');

  const getInputResponse: GetInputResponseCb = () => ({
    text: textInput,
  });

  const InputComponent = (
    <OneLineText
      value={textInput}
      placeholder={placeholder}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const cb = hackformUtils.createCbSubmitValidate(getInputResponse);
          cb();
        }
      }}
    />
  );

  return (
    <QuestionCreator
      inputComponentChildren={InputComponent}
      getInputResponse={getInputResponse}
    />
  );
};

export default ShortTextInput;
