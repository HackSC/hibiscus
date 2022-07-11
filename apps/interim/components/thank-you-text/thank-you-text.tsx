import { H3 } from '@hacksc-platforms/ui';
import styled from 'styled-components';
import { GradientSpan } from '../gradient-span/gradient-span';

export interface ThankYouTextProps {
  nextYear: number;
}

export function ThankYouText({ nextYear }: ThankYouTextProps) {
  const lastYear = nextYear - 1;

  return (
    <ThankYouTextH3>
      Thank you so much for joining us this year at{' '}
      <GradientSpan>HackSC {lastYear}!</GradientSpan> We hope you’ll join us for
      our next event in April {nextYear}. Stay tuned for{' '}
      <GradientSpan>HackSC {nextYear}</GradientSpan> applications coming out
      this winter!
    </ThankYouTextH3>
  );
}

export default ThankYouText;

const ThankYouTextH3 = styled(H3)`
  margin: 1.5rem 0;
  font-weight: 300;
`;
