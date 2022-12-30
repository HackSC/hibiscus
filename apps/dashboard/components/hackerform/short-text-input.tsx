import React, { useState } from 'react';
import { OneLineText } from '@hibiscus/ui-kit-2023';
import { QuestionFormProps } from './hackform-question';
import QuestionCreator from './question-creator';
import { GetInputResponseCb } from '../../common/types';
import { useHackform } from '../../hooks/use-hackform/use-hackform';

type Props = QuestionFormProps & { placeholder: string; initialError?: string };

export const ShortTextInput = (props: Props) => {
  const { currentQuestionIndex, responses, ...hackformUtils } = useHackform();
  const { placeholder } = props;
  const [textInput, setInput] = useState(
    hackformUtils.getCurrentResponse()?.input.text ?? ''
  );

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
      goNextQuestion={hackformUtils.createCbGoNextQuestionValidateSilently(
        getInputResponse
      )}
      goPreviousQuestion={hackformUtils.createCbGoPrevQuestionValidateSilently(
        getInputResponse
      )}
      qi={currentQuestionIndex}
      question={hackformUtils.getCurrentQuestion()}
      handleSubmitWithValidation={hackformUtils.createCbSubmitValidate(
        getInputResponse
      )}
      inputComponentChildren={InputComponent}
      error={hackformUtils.getCurrentError()}
    />
  );
};

export default ShortTextInput;
