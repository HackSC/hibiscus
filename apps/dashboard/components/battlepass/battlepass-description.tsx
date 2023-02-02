import React, { useState } from 'react';
import { H1, H3, H4, Modal, Text } from '@hibiscus/ui';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import Image from 'next/image';
import styled from 'styled-components';
import { AiFillInfoCircle } from 'react-icons/ai';
import { GrayBox } from '../gray-box/gray-box';

function BattlepassDescription() {
  const { user } = useHibiscusUser();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        <GrayBox style={{ maxWidth: '30rem' }}>
          <H3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            About Battlepass
          </H3>
          <Text>
            Besides from hours of fueled hacking and building your great
            projects at our inaugural hackathon, we also host various workshops,
            speakers, and events for you to attend, ranging from intro to
            JavaScript to keynotes from well-known veterans in the technology
            industry.
          </Text>
          <br />
          <Text>
            Battlepass is HackSC{"'"}s rewards and points system for you, our{' '}
            <GlowSpan
              color={Colors2023.BLUE.STANDARD}
              shadowColor={Colors2023.BLUE.DARK}
            >
              hackers
            </GlowSpan>
            , to have fun attending our events! When you have successfully
            checked in and attended these events, we will give you{' '}
            <GlowSpan>Battlepass points</GlowSpan>. Eventually, if you get
            enough points, you will be able to win some cool prizes! Notable
            prizes include <GlowSpan>Tiles</GlowSpan> and{' '}
            <GlowSpan>Roku streaming sticks</GlowSpan>.
          </Text>
          <br />
          <Text>
            Besides from getting points via going to our events, we will also
            give you points for completing{' '}
            <GlowSpan>Bonus Points tasks</GlowSpan>, which we will reveal soon
            😊
          </Text>
          <br />
          <Text>
            We can not wait to see you this{' '}
            <GlowSpan>Friday, February 3rd</GlowSpan>! We will send more
            information and logistics as we get closer to the event.
          </Text>
          <br />
          <Text style={{ fontStyle: 'italic' }}>Best,</Text>
          <Text style={{ fontStyle: 'italic' }}>The HackSC Team</Text>
        </GrayBox>
      </Modal>
      <H1>
        Welcome to{' '}
        <GlowSpan shadowColor={Colors2023.GRAY.SHLIGHT}>Battlepass</GlowSpan>,{' '}
        <GlowSpan shadowColor={Colors2023.BLUE.STANDARD}>
          {user.firstName}
        </GlowSpan>
      </H1>
      <InfoDiv
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <H3 style={{ color: Colors2023.GRAY.SHLIGHT }}>
          <AiFillInfoCircle /> What is battlepass?
        </H3>
      </InfoDiv>
      <div
        style={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ComingSoonBattlepass />
      </div>
    </div>
  );
}

export default BattlepassDescription;

const InfoDiv = styled.div`
  width: max-content;
  cursor: pointer;
  :hover {
    border-bottom: 1px solid ${Colors2023.GRAY.SHLIGHT};
  }
`;

const ComingSoonBattlepass = () => {
  return (
    <Container>
      <H1 style={{ fontSize: '50px', lineHeight: '60px' }}>
        <GlowSpan
          color={Colors2023.BLUE.LIGHT}
          shadowColor={Colors2023.BLUE.STANDARD}
        >
          Coming Soon!
        </GlowSpan>
      </H1>
      <H3>
        Closer to the hackathon, more Battlepass-related stuff will show up
        here.
      </H3>
      <Image
        src={'/hackform-illustrations/green-puzzle.svg'}
        width={200}
        height={200}
        alt="Earth-like character wearing shades pulling baggage and a moon"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
