import { FormQuestion, FormQuestionType } from '@hacksc-platforms/types';
import React from 'react';
import styled from 'styled-components';
import { H1, H3 } from '@hacksc-platforms/ui';
import ShortTextInput from './short-text-input';
import { ArrowButton } from '@hacksc-platforms/ui-kit-2023';

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
    <MainWrapper>
      <QuestionWrapper>
        <H1>
          {(qi + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
          })}
        </H1>
        <H3>{question.title}</H3>
        {question.type === FormQuestionType.ShortText && (
          <ShortTextInput {...props} placeholder={''} />
        )}
      </QuestionWrapper>
      <BottomWidgetsContainer>
        <BackNextContainer>
          <ArrowButton orientation="left" onClick={props.onClickBack} />
          <ArrowButton onClick={props.onClickNext} />
        </BackNextContainer>
      </BottomWidgetsContainer>
    </MainWrapper>
  );
}

export default FormQuestionComponent;

const QuestionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 0 0 3rem;
  justify-content: center;
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
