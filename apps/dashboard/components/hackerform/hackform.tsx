import React from 'react';
import styled from 'styled-components';
import HackformIntroduction from './hackform-introduction';
import HackformQuestionComponent from './hackform-question';
import { FormMetadata } from '@hibiscus/types';
import HackformEnding from './hackform-end';
import { useHackform } from '../../hooks/use-hackform/use-hackform';
import { useAppSelector } from '../../hooks/redux/hooks';
import { getCQI, getCurrentError } from '../../store/hackform-slice';

/* eslint-disable-next-line */
export interface HackerformProps {
  formMetadata: FormMetadata;
}

export function Hackerform({ formMetadata }: HackerformProps) {
  const hackformUtils = useHackform();
  const cqi = useAppSelector(getCQI);
  const currentError = useAppSelector(getCurrentError);

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
        const [firstErrorQI, firstError] = entry;
        hackformUtils.jumpQuestion(firstErrorQI);
        return <HackformQuestionComponent initialError={firstError} />;
      }
      return <HackformEnding formMetadata={formMetadata} />;
    }
    return <HackformQuestionComponent initialError={currentError} />;
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
