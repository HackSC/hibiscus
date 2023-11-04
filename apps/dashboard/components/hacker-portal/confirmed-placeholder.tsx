import { H1, H3 } from '@hibiscus/ui';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getEnv } from '@hibiscus/env';
import { Button } from '@hibiscus/ui-kit-2023';

export const ConfirmedPlaceholder = () => {
  const [discordToken, setDiscordToken] = useState<string | null>(null);
  const { user } = useHibiscusUser();

  const discordInvite = getEnv().Hibiscus.Discord.InviteUrl;

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
      <br />
      <H3>
        If you haven&apos;t already, please complete and sign the{' '}
        <a
          href={getEnv().Hibiscus.RSVPForm.WaiverURL}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          HackSC waiver
        </a>{' '}
        as soon as possible!
      </H3>
      <br />
      <H3>
        If you haven&apos;t already, join our official HackSC X Discord server
        at{' '}
        <a
          href={`https://discord.gg/${discordInvite}`}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          discord.gg/{discordInvite}
        </a>{' '}
        and verify your account by following the provided instructions!
      </H3>
      <H3>
        Your Discord verification token is{' '}
        {discordToken ? discordToken : '...Loading...'}
      </H3>
      <br />

      <H3>Review the Hacker Welcome Packet below!</H3>
      <a
        href={getEnv().Hibiscus.RSVPForm.HackerPacketURL}
        target="_blank"
        rel="noreferrer"
      >
        <Button color="black" style={{ marginTop: '10px' }}>
          Hacker Welcome Packet
        </Button>
      </a>
    </Container>
  );
};

export default ConfirmedPlaceholder;

const Container = styled.div``;
