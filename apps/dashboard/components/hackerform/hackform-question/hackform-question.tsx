import { HackformQuestionType } from '@hibiscus/types';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import React from 'react';
import styled from 'styled-components';
import LongTextQuestion from '../long-text-question/long-text-question';
import SearchableOptionsInput from '../searchable-options-question/searchable-options-question';
import { SingleChoiceInput } from '../single-choice-input/single-choice-input';
import { DateQuestionInput } from '../date-question/date-question';
import ShortTextInput from '../short-text-question/short-text-question';
import MultiSelectQuestion from '../multi-select-question/multi-select-question';
import FileQuestion from '../file-question/file-question';

export function HackformQuestionComponent() {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();
  const question = hackformUtils.getCurrentQuestion();

  const getInputSubcomponent = () => {
    switch (question.type) {
      case HackformQuestionType.ShortText:
        return (
          <ShortTextInput
            placeholder={question.placeholder}
            key={currentQuestionIndex}
          />
        );
      case HackformQuestionType.LongText:
        return (
          <LongTextQuestion
            placeholder={question.placeholder}
            key={currentQuestionIndex}
          />
        );
      case HackformQuestionType.SingleOptionDropdown:
        return (
          <SearchableOptionsInput
            options={question.options}
            key={currentQuestionIndex}
          />
        );
      case HackformQuestionType.SingleChoice:
        return (
          <SingleChoiceInput
            options={Array.isArray(question.options) ? question.options : []}
            hasOtherField={question.hasOtherField}
            key={currentQuestionIndex}
          />
        );
      case HackformQuestionType.Date:
        return <DateQuestionInput key={currentQuestionIndex} />;
      case HackformQuestionType.MultipleSelect:
        return (
          <MultiSelectQuestion
            key={currentQuestionIndex}
            options={Array.isArray(question.options) ? question.options : []}
          />
        );
      case HackformQuestionType.File:
        return <FileQuestion key={currentQuestionIndex} />;
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

  @media (max-width: 430px) {
    margin-left: 0rem;
    margin-top: 6rem;
  }
`;
