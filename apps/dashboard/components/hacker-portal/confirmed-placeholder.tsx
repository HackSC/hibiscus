import { H1, H3 } from '@hibiscus/ui';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const ConfirmedPlaceholder = () => {
  const [discordToken, setDiscordToken] = useState<string | null>(null);
  const { user } = useHibiscusUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user != null) {
        try {
          const token = await axios.get(`/api/discord/${user.id}`);
          setDiscordToken(token.data.token);
        } catch {
          setDiscordToken('ERROR');
        }
      }
    };

    fetchData();
  }, [user]);

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

      <H3>
        Your Discord verification token for our official HackSC X Discord server
        is {discordToken ? discordToken : '...Loading...'}
      </H3>
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
