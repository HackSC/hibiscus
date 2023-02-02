import { H1, H3, H4, Link } from '@hibiscus/ui';
import Image from 'next/image';
import styled from 'styled-components';

export const DeclinedPlaceholder = () => {
  return (
    <Container>
      <Image
        alt="Airplane postcard illustration"
        src="/hackform-illustrations/postcard-plane.svg"
        width={200}
        height={200}
      />
      <H1>You have declined your spot for HackSC 2023</H1>
      <H3>
        Bummer 😞 Welp, there{"'"}s always another chance to build something
        cool 😄 Make sure to stay up to date with HackSC through our{' '}
        <Link href="https://instagram.com/hackscofficial/" passHref underline>
          social media
        </Link>{' '}
        for other upcoming events!
      </H3>
      <br />
      <H3>We look forward to seeing you again 🌺</H3>
    </Container>
  );
};

export default DeclinedPlaceholder;

const Container = styled.div``;
