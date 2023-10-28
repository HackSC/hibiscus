import { H1, H3 } from '@hibiscus/ui';
import { Button } from '@hibiscus/ui-kit-2023';
import Image from 'next/image';
import styled from 'styled-components';

export const ConfirmedPlaceholder = () => {
  return (
    <Container>
      <Image
        alt="Airplane postcard illustration"
        src="/hackform-illustrations/postcard-plane.svg"
        width={200}
        height={200}
      />
      <H1>You have confirmed your spot for HackSC X!</H1>
      <H3>We look forward to seeing you 🌺</H3>
      {/* <H3>Review the Hacker Packet below!</H3> */}
      {/* <a href="example.com">
        <Button color="black" style={{ marginTop: '10px' }}>
          Hacker Packet
        </Button>
      </a> */}
    </Container>
  );
};

export default ConfirmedPlaceholder;

const Container = styled.div``;
