import {
  FormMetadata,
  FormQuestionType,
} from '../../../../libs/types/src/lib/form';
import styled from 'styled-components';
import Introduction from './introduction';
import { useState } from 'react';
import FormQuestionComponent from './question';

/* eslint-disable-next-line */
export interface HackerformProps {}

const formMetadata: FormMetadata = {
  entry: {
    title: 'HackSC 2023 Application',
    subtitle:
      "We're so glad to have you join us for SoCal's favorite hackathon",
    estTimeInMinutes: 5,
  },
  questions: [
    {
      title: 'Please confirm your full name:',
      type: FormQuestionType.ShortText,
    },
    {
      title: 'Please enter your date of birth:',
      type: FormQuestionType.Date,
    },
    {
      title: 'What school do you go to?',
      type: FormQuestionType.SingleOptionDropdown,
    },
    {
      title: 'Select your program:',
      type: FormQuestionType.SingleOptionDropdown,
    },
  ],
  end: {
    title: 'Thank you for applying!',
    subtitle:
      'We will get back to you soon via email. Meanwhile, feel free to check out the portal and make a Team',
  },
};

export function Hackerform(props: HackerformProps) {
  const [currentQuestionIndex, setCQI] = useState(-1);

  const onClickNextQuestion = () => {
    if (currentQuestionIndex < formMetadata.questions.length)
      setCQI(currentQuestionIndex + 1);
  };

  const onClickBackQuestion = () => {
    if (currentQuestionIndex > -1) setCQI(currentQuestionIndex - 1);
  };

  return (
    <StyledHackerform>
      {currentQuestionIndex === -1 ? (
        <Introduction
          formMetadata={formMetadata}
          onClick={onClickNextQuestion}
        />
      ) : currentQuestionIndex === formMetadata.questions.length ? (
        <div></div>
      ) : (
        <FormQuestionComponent
          question={formMetadata.questions[currentQuestionIndex]}
          qi={currentQuestionIndex}
          onClickBack={onClickBackQuestion}
          onClickNext={onClickNextQuestion}
          onClickSubmit={onClickNextQuestion} // naive for now
        />
      )}
    </StyledHackerform>
  );
}

export default Hackerform;

const StyledHackerform = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  width: 70%;
`;
