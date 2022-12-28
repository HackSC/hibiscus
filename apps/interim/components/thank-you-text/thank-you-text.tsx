import { GradientSpan, H3 } from '@hibiscus/ui';
import styled from 'styled-components';

export interface ThankYouTextProps {
  nextYear: number;
}

export function ThankYouText({ nextYear }: ThankYouTextProps) {
  const lastYear = nextYear - 1;

  return (
    <Container>
      <ThankYouTextH3>
        Thank you so much for joining us this year at{' '}
        <GradientSpan>HackSC {lastYear}!</GradientSpan> We hope you’ll join us
        for our next event in Spring {nextYear}. Stay tuned for{' '}
        <GradientSpan>HackSC {nextYear}</GradientSpan> applications coming out
        this winter!
      </ThankYouTextH3>
    </Container>
  );
}

export default ThankYouText;

const Container = styled.div`
  margin: 1.5rem 0 0;
`;

const ThankYouTextH3 = styled(H3)`
  max-width: 35rem;
  font-weight: 400;
  font-size: 1.3rem;
  color: #2b2b2b;

  @media (max-width: 500px) {
    font-size: 1.25rem;
  }
`;
