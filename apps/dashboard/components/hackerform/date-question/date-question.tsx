import { DatePicker } from '@hibiscus/ui-kit-2023';
import { GetInputResponseCb } from '../../../common/types';
import { useState } from 'react';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import QuestionCreator from '../question-creator';

interface DateQuestionInputProps {}

export const DateQuestionInput = (props: DateQuestionInputProps) => {
  const { ...hackformUtils } = useHackform();
  const initialInput = hackformUtils.getCurrentResponse()?.input;
  const [text, setText] = useState<string>(initialInput?.text ?? '');

  const getInputResponse: GetInputResponseCb = () => ({ text });
  const InputComponent = (
    <DatePicker
      placeholder="e.g in MM/DD/YYYY format"
      onChange={(e) => {
        const textInput = e.target.value;
        setText(textInput);
      }}
      onClickDay={(d, e) => {
        setText(d.toLocaleDateString('en-US'));
      }}
      valueOneLineText={text}
    />
  );

  return (
    <QuestionCreator
      inputComponentChildren={InputComponent}
      getInputResponse={getInputResponse}
    />
  );
};
