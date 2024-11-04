import { H1, H3 } from '@hibiscus/ui';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getEnv } from '@hibiscus/env';
import { Button } from '@hibiscus/ui-kit-2023';
import HackSCGuy from '../svg/hacksc-guy';

export const ConfirmedPlaceholder = () => {
  // const [discordToken, setDiscordToken] = useState<string | null>(null);
  const { user } = useHibiscusUser();

  const discordInvite = getEnv().Hibiscus.Discord.InviteUrl;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user != null) {
  //       try {
  //         const token = await axios.get(`/api/discord/${user.id}`);
  //         setDiscordToken(token.data.token);
  //       } catch {
  //         setDiscordToken('ERROR');
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [user]);

  return (
    <Container>
      <HackSCGuy />
      <Heading>You have confirmed your spot for SoCal Tech Week!</Heading>
      <TextBody>We look forward to seeing you 🌺</TextBody>
      <br />
      {/* <TextBody>
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
      </TextBody>
      <br /> */}
      <TextBody>
        If you haven&apos;t already, join our official SoCal Tech Week Discord
        server at{' '}
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
      </TextBody>
      {/* <H3>
        Your Discord verification token is{' '}
        {discordToken ? discordToken : '...Loading...'}
      </H3> */}
      <br />

      <TextBody>Review the Hacker Welcome Packet below!</TextBody>
      <a
        href={getEnv().Hibiscus.RSVPForm.HackerPacketURL}
        target="_blank"
        rel="noreferrer"
      >
        <RedButton color="black" style={{ marginTop: '10px' }}>
          Hacker Welcome Packet
        </RedButton>
      </a>
    </Container>
  );
};

export default ConfirmedPlaceholder;

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

const RedButton = styled.button`
  padding: 12px 40px 12px 40px;
  border-radius: 8px;
  border: 1px solid black;

  width: fit-content;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #ffb1a3;
  //fonts
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  color: black;
  :hover {
    background: #ffded9;
    box-shadow: 0px 0px 5px rgba(239, 118, 118, 0.5);
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    background: #ffb1a3;
  }
`;
