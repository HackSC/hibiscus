import React, { useState } from 'react';
import { ParagraphText } from '@hibiscus/ui-kit-2023';
import { QuestionFormProps } from './hackform-question';
import { useHackform } from '../../hooks/use-hackform/use-hackform';
import QuestionCreator from './question-creator';

type Props = QuestionFormProps & { placeholder: string };

const LongTextQuestion = ({ placeholder }: Props) => {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();
  const [textInput, setInput] = useState(
    hackformUtils.getCurrentResponse()?.input.text ?? ''
  );

  const getInputResponse = () => ({ text: textInput });

  const InputComponent = (
    <ParagraphText
      style={{ width: '50rem' }}
      value={textInput}
      placeholder={placeholder}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
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
      submitButtonUnder
    />
  );
};

export default LongTextQuestion;
