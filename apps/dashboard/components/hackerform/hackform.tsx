import styled from 'styled-components';
import HackformIntroduction from './hackform-introduction';
import { useState } from 'react';
import HackformQuestionComponent from './hackform-question';
import { formMetadata } from '../../common/hackform-questions';
import { FormMetadata, HackformSubmission } from '@hacksc-platforms/types';
import HackformEnding from './hackform-end';

/* eslint-disable-next-line */
export interface HackerformProps {
  formMetadata: FormMetadata;
}

export function Hackerform(props: HackerformProps) {
  const [currentQuestionIndex, setCQI] = useState(-1);
  const [responses, setResponses] = useState<HackformSubmission>({
    responses: [],
  });

  const onClickNextQuestion = () => {
    if (currentQuestionIndex < formMetadata.questions.length)
      setCQI(currentQuestionIndex + 1);
  };

  const onClickBackQuestion = () => {
    if (currentQuestionIndex > -1) setCQI(currentQuestionIndex - 1);
  };

  return (
    <HackformWrapper>
      {currentQuestionIndex === -1 ? (
        <HackformIntroduction
          formMetadata={formMetadata}
          onClick={onClickNextQuestion}
        />
      ) : currentQuestionIndex === formMetadata.questions.length ? (
        <HackformEnding formMetadata={formMetadata} />
      ) : (
        <HackformQuestionComponent
          currentResponses={responses}
          setCurrentResponses={setResponses}
          question={formMetadata.questions[currentQuestionIndex]}
          qi={currentQuestionIndex}
          onClickBack={onClickBackQuestion}
          onClickNext={onClickNextQuestion}
          onClickSubmit={onClickNextQuestion} // naive for now
        />
      )}
    </HackformWrapper>
  );
}

export default Hackerform;

const HackformWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
