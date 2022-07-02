import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ThankYouTextProps {}

const StyledThankYouText = styled.div`
  font-family: Inter;
  font-weight: 600;
`;

export function ThankYouText(props: ThankYouTextProps) {
  return (
    <StyledThankYouText>
      Thanks so much for joining us this year at HackSC 20XX! We hope you’ll
      join us for our next event in Month 20XX. Stay tuned for HackSC 20XX
      applications coming out this winter!
    </StyledThankYouText>
  );
}

export default ThankYouText;
