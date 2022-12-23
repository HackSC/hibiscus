import {
  FormQuestion,
  FormQuestionType,
  HackformQuestionResponse,
  HackformSubmission,
} from '@hacksc-platforms/types';
import { H1, H3 } from '@hacksc-platforms/ui';
import { ArrowButton } from '@hacksc-platforms/ui-kit-2023';
import React from 'react';
import styled from 'styled-components';
import LongTextQuestion from './long-text-input';
import SearchableOptionsInput from './searchable-options-input';
import ShortTextInput from './short-text-input';

export interface QuestionFormProps {
  question: FormQuestion;
  currentResponses: HackformSubmission; // passed by reference
  qi: number;
  saveResponse?: (response: HackformQuestionResponse) => void;
  goNextQuestion?: () => void;
  goPreviousQuestion?: () => void;
  addErrorForQuestion?: (qi: number, error: string) => void;
  resolveError?: (qi: number) => void;
}

function HackformQuestionComponent(props: QuestionFormProps) {
  const { question, qi } = props;

  const getInputSubcomponent = () => {
    switch (question.type) {
      case FormQuestionType.ShortText:
        return <ShortTextInput {...props} placeholder={question.placeholder} />;
      case FormQuestionType.LongText:
        return (
          <LongTextQuestion {...props} placeholder={question.placeholder} />
        );
      case FormQuestionType.SingleOptionDropdown:
        return <SearchableOptionsInput {...props} options={question.options} />;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <QuestionWrapper>
        <H1>
          {(qi + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
          })}
        </H1>
        <H3>
          {question.title}
          {question.required && <SpanRed>*</SpanRed>}
        </H3>
        {getInputSubcomponent()}
      </QuestionWrapper>
      <BottomWidgetsContainer>
        <BackNextContainer>
          <ArrowButton orientation="left" onClick={props.goPreviousQuestion} />
          <ArrowButton onClick={props.goNextQuestion} />
        </BackNextContainer>
      </BottomWidgetsContainer>
    </Wrapper>
  );
}

export default HackformQuestionComponent;

const BottomWidgetsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;

const BackNextContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const SpanRed = styled.span`
  color: #fc5d5d;
`;

const QuestionWrapper = styled.div`
  height: 100%;
  display: flex;
  margin-left: 10rem;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
