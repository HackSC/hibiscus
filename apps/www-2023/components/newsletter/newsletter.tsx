import styled from 'styled-components';
import { H1, Label, Text } from '@hibiscus/ui';
import { ColorSpan, GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import EmailNewsletterInputSection from '../email-newsletter-input-section/email-newsletter-input-section';
/* eslint-disable-next-line */
export interface NewsletterProps {}

export function Newsletter(props: NewsletterProps) {
  return (
    <StyledNewsletter>
      <StyledContent>
        <GlowSpan shadowColor={Colors2023.RED.STANDARD}>
          <H1>Welcome to HackSC</H1>
        </GlowSpan>
        <GlowSpan shadowColor={Colors2023.YELLOW.STANDARD}>
          <Label>socal&apos;s flagship hackathon</Label>
        </GlowSpan>
        <Text>
          Located in the heart of sunny Los Angeles, HackSC brings hundreds of
          hackers, designers, and visionaries from all across the world together
          for a weekend of{' '}
          <ColorSpan color={Colors2023.BLUE.STANDARD}>innovation</ColorSpan>,{' '}
          <ColorSpan color={Colors2023.YELLOW.STANDARD}>connection</ColorSpan>,
          and <ColorSpan color={Colors2023.RED.STANDARD}>education</ColorSpan>.
          Engage in{' '}
          <ColorSpan color={Colors2023.PINK.LIGHT}>workshops</ColorSpan>,{' '}
          <ColorSpan color={Colors2023.GREEN.STANDARD}>
            listen to speakers
          </ColorSpan>
          , and{' '}
          <ColorSpan color={Colors2023.PURPLE.LIGHT}>
            create relationships
          </ColorSpan>{' '}
          that can last a lifetime with students and professionals who love to
          build. Come hack with us!
        </Text>
        <EmailNewsletterInputSection />
      </StyledContent>
    </StyledNewsletter>
  );
}

const StyledNewsletter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: url('/img/graphics/bg-desktop.svg');
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  @media screen and (max-width: 1080px) {
    background-image: url('img/graphics/bg-mobile.svg');
  }
`;

const StyledContent = styled.div`
  height: 60vh;
  margin-left: 50vw;
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > p {
    text-align: justify;
  }
  @media screen and (max-width: 1080px) {
    margin-top: 40vh;
    justify-content: flex-start;
    margin-left: 3rem;
    margin-right: 3rem;
    align-items: center;
  }
  @media screen and (max-width: 800px) {
    margin-left: 5vw;
    margin-right: 5vw;
  }
`;

export default Newsletter;
