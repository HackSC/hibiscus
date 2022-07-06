import { GradientSpan } from '../gradient-span/gradient-span';

export interface ThankYouTextProps {
  nextYear: number;
}

export function ThankYouText({ nextYear }: ThankYouTextProps) {
  const lastYear = nextYear - 1;

  return (
    <p style={{ fontWeight: 350, fontSize: 18.5, lineHeight: 1.4 }}>
      Thank you so much for joining us this year at{' '}
      <GradientSpan>HackSC {lastYear}!</GradientSpan> We hope you’ll join us for
      our next event in April {nextYear}. Stay tuned for{' '}
      <GradientSpan>HackSC {nextYear}</GradientSpan> applications coming out
      this winter!
    </p>
  );
}

export default ThankYouText;
