import { GradientSpan } from '../gradient-span/gradient-span';
import { H3 } from '@hacksc-platforms/ui';

export interface ThankYouTextProps {
  nextYear: number;
}

export function ThankYouText({ nextYear }: ThankYouTextProps) {
  const lastYear = nextYear - 1;

  return (
    <H3>
      Thank you so much for joining us this year at{' '}
      <GradientSpan>HackSC {lastYear}!</GradientSpan> We hope you’ll join us for
      our next event in April {nextYear}. Stay tuned for{' '}
      <GradientSpan>HackSC {nextYear}</GradientSpan> applications coming out
      this winter!
    </H3>
  );
}

export default ThankYouText;
