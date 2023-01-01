import { FormQuestionType } from '@hibiscus/types';
import { useHackform } from '../../hooks/use-hackform/use-hackform';
import React from 'react';
import styled from 'styled-components';
import LongTextQuestion from './long-text-input';
import SearchableOptionsInput from './searchable-options-input';
import ShortTextInput from './short-text-input';
import { SingleChoiceInput } from './single-choice-input/single-choice-input';
import { DateQuestionInput } from './date-question/date-question';

export interface QuestionFormProps {
  initialError: string;
}

function HackformQuestionComponent({ initialError }: QuestionFormProps) {
  const { ...hackformUtils } = useHackform();

  const getInputSubcomponent = () => {
    const question = hackformUtils.getCurrentQuestion();
    switch (question.type) {
      case FormQuestionType.ShortText:
        return (
          <ShortTextInput
            placeholder={question.placeholder}
            initialError={initialError}
          />
        );
      case FormQuestionType.LongText:
        return (
          <LongTextQuestion
            placeholder={question.placeholder}
            initialError={initialError}
          />
        );
      case FormQuestionType.SingleOptionDropdown:
        return (
          <SearchableOptionsInput
            options={question.options}
            initialError={initialError}
          />
        );
      case FormQuestionType.SingleChoice:
        return <SingleChoiceInput options={question.options} />;
      case FormQuestionType.Date:
        return <DateQuestionInput />;
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
