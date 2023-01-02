import React from 'react';
import styled from 'styled-components';
import HackformIntroduction from '../hackform-introduction/hackform-introduction';
import HackformQuestionComponent from '../hackform-question/hackform-question';
import { FormMetadata } from '@hibiscus/types';
import HackformEnding from '../hackform-end/hackform-end';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';

/* eslint-disable-next-line */
export interface HackerformProps {
  formMetadata: FormMetadata;
}

export function Hackerform({ formMetadata }: HackerformProps) {
  const { currentQuestionIndex: cqi, ...hackformUtils } = useHackform();

  // get page to show based on question index etc...
  const getHackformPage = () => {
    if (cqi === -1) {
      return (
        <HackformIntroduction
          formMetadata={formMetadata}
          onClick={hackformUtils.goNextQuestion}
        />
      );
    } else if (cqi === formMetadata.questions.length) {
      // get the first one with an error and go back to it
      const entry = hackformUtils.getFirstError();
      if (entry !== null) {
        const [firstErrorQI] = entry;
        hackformUtils.jumpQuestion(firstErrorQI);
        return <HackformQuestionComponent />;
      }
      return <HackformEnding formMetadata={formMetadata} />;
    }
    return <HackformQuestionComponent />;
  };

  return <HackformWrapper>{getHackformPage()}</HackformWrapper>;
}

export default Hackerform;

const HackformWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
