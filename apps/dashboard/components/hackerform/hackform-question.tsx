import {
  FormQuestion,
  FormQuestionType,
  HackformQuestionResponse,
  HackformSubmission,
} from '@hacksc-platforms/types';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { H1, H3 } from '@hacksc-platforms/ui';
import ShortTextInput from './short-text-input';
import { ArrowButton } from '@hacksc-platforms/ui-kit-2023';
import LongTextQuestion from './long-text-input';

export interface QuestionFormProps {
  question: FormQuestion;
  currentResponses: HackformSubmission; // passed by refernce
  setCurrentResponses: Dispatch<SetStateAction<HackformSubmission>>;
  qi: number;
  onClickSubmit?: (response: HackformQuestionResponse) => void;
  onClickNext?: () => void;
  onClickBack?: () => void;
  onErrorQuestion?: (qi: number, error: string) => void;
  onErrorResolved?: (qi: number) => void;
}

function HackformQuestionComponent(props: QuestionFormProps) {
  const { question, qi, currentResponses, setCurrentResponses } = props;

  // handle when person submits
  const handleSubmitQuestion = (response: HackformQuestionResponse) => {
    switch (question.type) {
      case FormQuestionType.ShortText:
        if (qi >= currentResponses.responses.length) {
          // there's no response for this question yet
          setCurrentResponses(({ responses }) => {
            const newResponses: typeof responses = [
              ...responses,
              { question, input: { text: response.input.text } },
            ];
            return { responses: newResponses };
          });
        } else {
          // there is a response for this so we modify that response
          // with the current one
          setCurrentResponses(({ responses }) => {
            const newResponses = [...responses];
            newResponses[qi].input.text = response.input.text;
            return { responses: newResponses };
          });
        }
        break;
      case FormQuestionType.LongText:
        break;
      case FormQuestionType.Date:
        break;
      case FormQuestionType.Email:
        break;
      case FormQuestionType.Number:
        break;
      case FormQuestionType.SingleOptionDropdown:
        break;
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
        {question.type === FormQuestionType.ShortText ? (
          <ShortTextInput
            {...props}
            placeholder={question.placeholder}
            onClickSubmit={handleSubmitQuestion}
          />
        ) : question.type === FormQuestionType.LongText ? (
          <LongTextQuestion
            {...props}
            placeholder={question.placeholder}
            onClickSubmit={handleSubmitQuestion}
          />
        ) : null}
      </QuestionWrapper>
      <BottomWidgetsContainer>
        <BackNextContainer>
          <ArrowButton orientation="left" onClick={props.onClickBack} />
          <ArrowButton onClick={props.onClickNext} />
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
