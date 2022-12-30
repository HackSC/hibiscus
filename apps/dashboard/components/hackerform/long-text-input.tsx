import React, { useState } from 'react';
import { Button, ParagraphText } from '@hibiscus/ui-kit-2023';
import { QuestionFormProps } from './hackform-question';
import {
  ErrorText,
  InputAndButtonWrapper,
  PageWrapper,
  QuestionWrapper,
  SmallText,
  ButtonHintTextContainer,
} from './common-styled-components';
import HackformQuestionHeader from './hackform-question-header';
import HackformBackNextWidget from './hackform-backnext-widget';
import styled from 'styled-components';
import { useHackform } from '../../hooks/use-hackform/use-hackform';

type Props = QuestionFormProps & { placeholder: string; initialError?: string };

const LongTextQuestion = ({ placeholder }: Props) => {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();
  const [textInput, setInput] = useState(
    hackformUtils.getCurrentResponse()?.input.text ?? ''
  );

  const getInputResponse = () => ({ text: textInput });

  const inputComponent = (
    <ParagraphText
      style={{ width: '50rem' }}
      value={textInput}
      placeholder={placeholder}
      onChange={(e) => {
        setInput(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          const cb = hackformUtils.createCbSubmitValidate(getInputResponse);
          cb();
        }
      }}
    />
  );

  return (
    <PageWrapper>
      <QuestionWrapper>
        <HackformQuestionHeader
          question={hackformUtils.getCurrentQuestion()}
          qi={currentQuestionIndex}
        />
        <InputAndButtonWrapperOverride>
          {inputComponent}
          <ButtonHintTextContainer>
            <Button
              color="black"
              onClick={hackformUtils.createCbSubmitValidate(getInputResponse)}
            >
              OK
            </Button>
            <SmallText>press Enter.</SmallText>
          </ButtonHintTextContainer>
        </InputAndButtonWrapperOverride>
        <ErrorText>{hackformUtils.getCurrentError()}</ErrorText>
      </QuestionWrapper>
      <HackformBackNextWidget
        goNextQuestion={hackformUtils.createCbGoNextQuestionValidateSilently(
          getInputResponse
        )}
        goPreviousQuestion={hackformUtils.createCbGoPrevQuestionValidateSilently(
          getInputResponse
        )}
      />
    </PageWrapper>
  );
};

export default LongTextQuestion;

const InputAndButtonWrapperOverride = styled(InputAndButtonWrapper)`
  flex-direction: column;
  align-items: flex-start;
`;
