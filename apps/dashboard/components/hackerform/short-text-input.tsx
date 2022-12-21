import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, OneLineText } from '@hacksc-platforms/ui-kit-2023';
import { QuestionFormProps } from './hackform-question';
import { Text } from '@hacksc-platforms/ui';
import { Colors2023 } from '@hacksc-platforms/styles';

const ShortTextInput = ({
  question,
  onClickSubmit,
  onClickNext,
  currentResponses,
  addErrorForQuestion: onErrorQuestion,
  resolveError: onErrorResolved,
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
    <Wrapper>
      <InputAndButtonWrapper>
        <OneLineText
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
        <SmallText>press Enter.</SmallText>
      </InputAndButtonWrapper>
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default ShortTextInput;

const InputAndButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ErrorText = styled(Text)`
  color: ${Colors2023.RED.STANDARD};
`;

const SmallText = styled(Text)`
  font-size: small;
`;
