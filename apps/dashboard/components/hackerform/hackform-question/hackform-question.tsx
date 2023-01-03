import { FormQuestionType } from '@hibiscus/types';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import React from 'react';
import styled from 'styled-components';
import LongTextQuestion from '../long-text-input/long-text-input';
import SearchableOptionsInput from '../searchable-options-input/searchable-options-input';
import { SingleChoiceInput } from '../single-choice-input/single-choice-input';
import { DateQuestionInput } from '../date-question/date-question';
import ShortTextInput from '../short-text-input/short-text-input';
import MultiSelectQuestion from '../multi-select-question/multi-select-question';

export function HackformQuestionComponent() {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();
  const question = hackformUtils.getCurrentQuestion();

  const getInputSubcomponent = () => {
    switch (question.type) {
      case FormQuestionType.ShortText:
        return (
          <ShortTextInput
            placeholder={question.placeholder}
            key={currentQuestionIndex}
          />
        );
      case FormQuestionType.LongText:
        return (
          <LongTextQuestion
            placeholder={question.placeholder}
            key={currentQuestionIndex}
          />
        );
      case FormQuestionType.SingleOptionDropdown:
        return (
          <SearchableOptionsInput
            options={question.options}
            key={currentQuestionIndex}
          />
        );
      case FormQuestionType.SingleChoice:
        return (
          <SingleChoiceInput
            options={question.options}
            hasOtherField={question.hasOtherField}
            key={currentQuestionIndex}
          />
        );
      case FormQuestionType.Date:
        return <DateQuestionInput key={currentQuestionIndex} />;
      case FormQuestionType.MultipleSelect:
        return (
          <MultiSelectQuestion
            key={currentQuestionIndex}
            options={question.options}
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
