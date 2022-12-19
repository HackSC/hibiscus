import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ParagraphText } from '@hacksc-platforms/ui-kit-2023';
import { QuestionFormProps } from './hackform-question';

const LongTextQuestion = ({
  question,
  onErrorQuestion,
  onErrorResolved,
  onClickSubmit,
  onClickNext,
  currentResponses,
  qi,
  placeholder,
}: QuestionFormProps & { placeholder: string }) => {
  const [error, setError] = useState('');
  const [textInput, setInput] = useState(
    currentResponses.responses[qi]?.input.text ?? ''
  );

  const handleSubmitWithValidation = () => {
    const { valid, errorDescription } = question.validationFunction({
      text: textInput,
    });
    if (valid) {
      onClickSubmit({ question, input: { text: textInput } });
      onErrorResolved(qi);
      onClickNext();
    } else {
      setError(errorDescription);
      onErrorQuestion(qi, errorDescription);
    }
  };

  return (
    <InputAndButtonWrapper>
      <ParagraphText
        style={{ width: '50rem' }}
        value={textInput}
        placeholder={placeholder}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmitWithValidation();
          }
        }}
      />
      <Button color="black" onClick={handleSubmitWithValidation}>
        OK
      </Button>
      {error}
    </InputAndButtonWrapper>
  );
};

export default LongTextQuestion;

const InputAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
