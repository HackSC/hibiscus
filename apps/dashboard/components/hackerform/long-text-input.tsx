import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ArrowButton,
  Button,
  OneLineText,
  ParagraphText,
} from '@hacksc-platforms/ui-kit-2023';
import { QuestionFormProps } from './hackform-question';
import { H1, H3 } from '@hacksc-platforms/ui';
import GlowSpan from '../glow-span';
import { Colors2023 } from '@hacksc-platforms/styles';

const LongTextQuestion = ({
  question,
  onClickSubmit,
  onClickBack,
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
    const { valid, error: textError } = validateInput();
    if (valid) {
      onClickSubmit({ question, input: { text: textInput } });
      onClickNext();
    } else {
      setError(textError);
    }
  };

  const validateInput = () => {
    if (question.required && textInput === '') {
      return { valid: false, error: 'Input required' };
    } else {
      return { valid: true, error: '' };
    }
  };

  return (
    <QuestionWrapper>
      <Wrapper>
        <H1>
          <GlowSpan
            color={Colors2023.BLUE.LIGHT}
            shadowColor={Colors2023.BLUE.DARK}
          >
            {(qi + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
            })}
          </GlowSpan>
        </H1>
        <H3>
          {question.title}
          {question.required && <SpanRed>*</SpanRed>}
        </H3>
        <InputAndButtonWrapper>
          <ParagraphText
            style={{ width: '50%' }}
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
      </Wrapper>
      <BottomWidgetsContainer>
        <BackNextContainer>
          <ArrowButton orientation="left" onClick={onClickBack} />
          <ArrowButton onClick={handleSubmitWithValidation} />
        </BackNextContainer>
      </BottomWidgetsContainer>
    </QuestionWrapper>
  );
};

export default LongTextQuestion;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

const InputAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const BottomWidgetsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;

const BackNextContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SpanRed = styled.span`
  color: #fc5d5d;
`;

const QuestionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding-left: 3rem;
`;
