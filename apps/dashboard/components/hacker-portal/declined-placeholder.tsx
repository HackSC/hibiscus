import { H1, H3, Link } from '@hibiscus/ui';
import Image from 'next/image';
import styled from 'styled-components';
import HackSCGuy from '../svg/hacksc-guy';

export const DeclinedPlaceholder = () => {
  return (
    <Container>
      <HackSCGuy />
      <Heading>You have declined your spot for SoCal Tech Week</Heading>
      <TextBody>
        Bummer 😞 Welp, there{"'"}s always another chance to build something
        cool 😄 Make sure to stay up to date with HackSC through our{' '}
        <Link href="https://instagram.com/hackscofficial/" passHref underline>
          social media
        </Link>{' '}
        for other upcoming events!
      </TextBody>
      <br />
      <TextBody>We look forward to seeing you again 🌺</TextBody>
    </Container>
  );
};

export default DeclinedPlaceholder;

const Container = styled.div``;

const Heading = styled.h1`
  font-family: Inter;
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -0.05em;
  text-align: left;
  color: #ff6347;
  margin: 0 0 1rem 0;
`;

const TextBody = styled.p`
  font-family: Inter;
  font-size: 25px;
  font-weight: 400;
  line-height: 30.26px;
  color: #ffb1a3;
`;
