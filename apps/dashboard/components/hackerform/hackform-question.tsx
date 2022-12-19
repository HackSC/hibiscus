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
import {
  ArrowButton,
  Button,
  ParagraphText,
} from '@hacksc-platforms/ui-kit-2023';
import LongTextQuestion from './long-text-input';

export interface QuestionFormProps {
  question: FormQuestion;
  currentResponses: HackformSubmission; // passed by refernce
  setCurrentResponses: Dispatch<SetStateAction<HackformSubmission>>;
  qi: number;
  onClickSubmit?: (response: HackformQuestionResponse) => void;
  onClickNext?: () => void;
  onClickBack?: () => void;
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
    <>
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
    </>
  );
}

export default HackformQuestionComponent;
