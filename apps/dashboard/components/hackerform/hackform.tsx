import styled from 'styled-components';
import HackformIntroduction from './hackform-introduction';
import React, { useState } from 'react';
import HackformQuestionComponent from './hackform-question';
import { FormMetadata, HackformSubmission } from '@hacksc-platforms/types';
import HackformEnding from './hackform-end';

/* eslint-disable-next-line */
export interface HackerformProps {
  formMetadata: FormMetadata;
}

export function Hackerform({ formMetadata }: HackerformProps) {
  const [currentQuestionIndex, setCQI] = useState(-1);
  const [responses, setResponses] = useState<HackformSubmission>({
    responses: {},
  });
  const [errors, setErrors] = useState<Record<number, string>>({}); // qi -> error

  const goToNextQuestion = () => {
    if (currentQuestionIndex < formMetadata.questions.length)
      setCQI(currentQuestionIndex + 1);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > -1) setCQI(currentQuestionIndex - 1);
  };

  const resolveError = (qi: number) => {
    setErrors((prev) => {
      const newPrev = { ...prev };
      delete newPrev[qi];
      return newPrev;
    });
  };

  const addQuestionErrors = (qi: number, error: string) => {
    setErrors((prev) => {
      const newPrev = { ...prev };
      newPrev[qi] = error;
      return newPrev;
    });
  };

  // get page to show based on question index etc...
  const getHackformPage = () => {
    if (currentQuestionIndex === -1) {
      return (
        <HackformIntroduction
          formMetadata={formMetadata}
          onClick={goToNextQuestion}
        />
      );
    } else if (currentQuestionIndex === formMetadata.questions.length) {
      if (Object.entries(errors).length > 0) {
        // get the first one with an error and go back to it
        const [firstErrorQI] = Object.entries(errors)[0];
        setCQI(Number.parseInt(firstErrorQI));
        return (
          <HackformQuestionComponent
            currentResponses={responses}
            setCurrentResponses={setResponses}
            question={formMetadata.questions[currentQuestionIndex]}
            qi={currentQuestionIndex}
            goPreviousQuestion={goToPreviousQuestion}
            goNextQuestion={goToNextQuestion}
            saveResponse={goToNextQuestion} // naive for now
            addErrorForQuestion={addQuestionErrors}
            resolveError={resolveError}
          />
        );
      } else {
        return <HackformEnding formMetadata={formMetadata} />;
      }
    } else {
      return (
        <HackformQuestionComponent
          currentResponses={responses}
          setCurrentResponses={setResponses}
          question={formMetadata.questions[currentQuestionIndex]}
          qi={currentQuestionIndex}
          goPreviousQuestion={goToPreviousQuestion}
          goNextQuestion={goToNextQuestion}
          saveResponse={goToNextQuestion} // naive for now
          addErrorForQuestion={addQuestionErrors}
          resolveError={resolveError}
        />
      );
    }
  };

  return <HackformWrapper>{getHackformPage()}</HackformWrapper>;
}

export default Hackerform;

const HackformWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
