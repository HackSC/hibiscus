import { Colors2023 } from '@hibiscus/styles';
import { HackformQuestion } from '@hibiscus/types';
import { H1, H3 } from '@hibiscus/ui';
import styled from 'styled-components';

interface HackformQuestionHeaderProps {
  question: HackformQuestion;
  qi: number;
}

export const HackformQuestionHeader = ({
  question,
  qi,
}: HackformQuestionHeaderProps) => {
  return (
    <Wrapper>
      <H1>
        {(qi + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
        })}
      </H1>
      <H3>
        {question.title}
        {question.required && <SpanRed>*</SpanRed>}
      </H3>
    </Wrapper>
  );
};

export default HackformQuestionHeader;

const Wrapper = styled.div`
  color: ${Colors2023.GRAY.LIGHT};
  max-width: 100rem;
`;

const SpanRed = styled.span`
  color: ${Colors2023.RED.STANDARD};
`;
