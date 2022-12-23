import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ParagraphText } from '@hacksc-platforms/ui-kit-2023';
import { QuestionFormProps } from './hackform-question';
import { Text } from '@hacksc-platforms/ui';
import { Colors2023 } from '@hacksc-platforms/styles';

const LongTextQuestion = ({
  question,
  addErrorForQuestion,
  resolveError,
  saveResponse,
  goNextQuestion,
  currentResponses: { responses },
  qi,
  placeholder,
}: QuestionFormProps & { placeholder: string }) => {
  const [error, setError] = useState('');
  const [textInput, setInput] = useState(responses[qi]?.input.text ?? '');

  const _handleValidationOnError = (errorDescription: string) => {
    setError(errorDescription);
    addErrorForQuestion(qi, errorDescription);
  };

  const _handleValidatedInput = () => {
    resolveError(qi);
    goNextQuestion();
  };

  const handleSubmitWithValidation = () => {
    const input = { text: textInput };
    const { valid, errorDescription } = question.validationFunction(input);
    // save responses regardless (so that when user revisit question they will
    // still have the previous response).
    saveResponse({ input });
    if (!valid) {
      _handleValidationOnError(errorDescription);
    } else {
      _handleValidatedInput();
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
      <ErrorText>{error}</ErrorText>
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

const ErrorText = styled(Text)`
  color: ${Colors2023.RED.STANDARD};
`;
