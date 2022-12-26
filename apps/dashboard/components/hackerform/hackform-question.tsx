import {
  FormQuestion,
  FormQuestionType,
  HackformQuestionResponse,
  HackformSubmission,
} from '@hacksc-platforms/types';
import React from 'react';
import styled from 'styled-components';
import LongTextQuestion from './long-text-input';
import SearchableOptionsInput from './searchable-options-input';
import ShortTextInput from './short-text-input';

export interface QuestionFormProps {
  question: FormQuestion;
  currentResponses: HackformSubmission; // passed by reference
  qi: number;
  saveResponse: (response: HackformQuestionResponse) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  addErrorForQuestion: (qi: number, error: string) => void;
  resolveError: (qi: number) => void;
  initialError: string;
}

function HackformQuestionComponent(props: QuestionFormProps) {
  const { question, initialError, qi } = props;

  const getInputSubcomponent = () => {
    switch (question.type) {
      case FormQuestionType.ShortText:
        return (
          <ShortTextInput
            {...props}
            placeholder={question.placeholder}
            initialError={initialError}
          />
        );
      case FormQuestionType.LongText:
        return (
          <LongTextQuestion
            {...props}
            placeholder={question.placeholder}
            initialError={initialError}
          />
        );
      case FormQuestionType.SingleOptionDropdown:
        return (
          <SearchableOptionsInput
            {...props}
            options={question.options}
            initialError={initialError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <QuestionWrapper>{getInputSubcomponent()}</QuestionWrapper>
    </Wrapper>
  );
}

export default HackformQuestionComponent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const QuestionWrapper = styled.div`
  height: 100%;
  display: flex;
  margin-left: 10rem;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
