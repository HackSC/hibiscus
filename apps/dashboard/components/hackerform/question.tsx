import { FormQuestion, FormQuestionType } from '@hacksc-platforms/types';
import React from 'react';
import styled from 'styled-components';
import { H1, H3 } from '@hacksc-platforms/ui';
import ShortTextInput from './short-text-input';

export interface QuestionFormProps {
  question: FormQuestion;
  qi: number;
  onClickSubmit?: () => void;
  onClickNext?: () => void;
  onClickBack?: () => void;
}

function FormQuestionComponent(props: QuestionFormProps) {
  const { question, qi } = props;
  return (
    <Wrapper>
      <H1>
        {(qi + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        })}
      </H1>
      <H3>{question.title}</H3>
      {question.type === FormQuestionType.ShortText && (
        <ShortTextInput {...props} placeholder="Enter your full name here" />
      )}
    </Wrapper>
  );
}
export default FormQuestionComponent;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 0 0 3rem;
  justify-content: center;
`;
