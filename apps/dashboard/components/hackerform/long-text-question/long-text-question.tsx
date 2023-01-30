import React, { useState } from 'react';
import { ParagraphText } from '@hibiscus/ui-kit-2023';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import QuestionCreator from '../question-creator/question-creator';
import styled from 'styled-components';
import { Text } from '@hibiscus/ui';
import { getWordCount } from '../../../common/utils';
import { Colors2023 } from '@hibiscus/styles';

type Props = { placeholder: string };

export const LongTextQuestion = ({ placeholder }: Props) => {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();
  const [textInput, setInput] = useState(
    hackformUtils.getCurrentResponse()?.input.text ?? ''
  );

  const getInputResponse = () => ({ text: textInput });

  const InputComponent = (
    <TextWrapper>
      <StyledParagraphText
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
      <WordCountText>Word count: {getWordCount(textInput)}</WordCountText>
    </TextWrapper>
  );

  return (
    <QuestionCreator
      inputComponentChildren={InputComponent}
      getInputResponse={getInputResponse}
      submitButtonUnder
    />
  );
};

export default LongTextQuestion;

const TextWrapper = styled.div``;

const WordCountText = styled(Text)`
  color: ${Colors2023.GRAY.SHLIGHT};
  font-size: small;
`;

const StyledParagraphText = styled(ParagraphText)`
  width: 50rem;
  @media (max-width: 430px) {
    width: 19rem;
  }
`;
