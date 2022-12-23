import {
  FormQuestion,
  FormQuestionType,
  HackformQuestionResponse,
  HackformSubmission,
} from '@hacksc-platforms/types';
import { H1, H3 } from '@hacksc-platforms/ui';
import { ArrowButton } from '@hacksc-platforms/ui-kit-2023';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import LongTextQuestion from './long-text-input';
import SearchableOptionsInput from './searchable-options-input';
import ShortTextInput from './short-text-input';

export interface QuestionFormProps {
  question: FormQuestion;
  currentResponses: HackformSubmission; // passed by refernce
  setCurrentResponses: Dispatch<SetStateAction<HackformSubmission>>;
  qi: number;
  saveResponse?: (response: HackformQuestionResponse) => void;
  goNextQuestion?: () => void;
  goPreviousQuestion?: () => void;
  addErrorForQuestion?: (qi: number, error: string) => void;
  resolveError?: (qi: number) => void;
}

function HackformQuestionComponent(props: QuestionFormProps) {
  const { question, qi, setCurrentResponses } = props;

  // handle when person submits
  const handleSubmitQuestion = (response: HackformQuestionResponse) => {
    setCurrentResponses(({ responses }) => {
      let input: HackformQuestionResponse['input'] = {};
      switch (question.type) {
        case FormQuestionType.Email:
        case FormQuestionType.ShortText:
        case FormQuestionType.LongText: // they will all fill the text field in the input.
          input = { text: response.input.text };
          break;
        case FormQuestionType.SingleOptionDropdown:
          input = {
            text: response.input.text,
            singleChoiceValue: response.input.singleChoiceValue,
          };
          break;
        default:
          break;
      }
      const newResponses = { ...responses, [qi]: { input } };
      return { responses: newResponses };
    });
  };

  let InputSubcomponent = () => {
    switch (question.type) {
      case FormQuestionType.ShortText:
        return (
          <ShortTextInput
            {...props}
            placeholder={question.placeholder}
            saveResponse={handleSubmitQuestion}
          />
        );
      case FormQuestionType.LongText:
        return (
          <LongTextQuestion
            {...props}
            placeholder={question.placeholder}
            saveResponse={handleSubmitQuestion}
          />
        );
      case FormQuestionType.SingleOptionDropdown:
        return (
          <SearchableOptionsInput
            {...props}
            options={question.options}
            saveResponse={handleSubmitQuestion}
          />
        );
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
        <InputSubcomponent />
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
