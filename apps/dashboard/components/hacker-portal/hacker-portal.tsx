import styled from 'styled-components';
import { H2, Link, Modal, Text } from '@hibiscus/ui';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import { HibiscusRole } from '@hibiscus/types';
import { H1, H3 } from '@hibiscus/ui';
import { ApplicationStatus } from '@hibiscus/types';
import { useState } from 'react';
import RSVPForm from '../rsvp-form/rsvp-form';
import { ComingSoon } from './coming-soon';
import { getColorsForRole } from '../../common/role.utils';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { GrayBox } from '../gray-box/gray-box';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import DeclinedPlaceholder from './declined-placeholder';
import { CongratsMessage } from './congrats-message';
import { RejectionMessage } from './rejection-message';
import BattlepassPage from '../battlepass/battlepass-page';
import { BattlepassAPIProvider } from '../../hooks/use-battlepass-api/use-battlepass-api';

type RSVPChoice = 'DECLINE' | 'ACCEPT';

export function HackerPortal() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, updateUser } = useHibiscusUser();
  const closeModal = () => setModalOpen(false);
  const userColors = getColorsForRole(user?.role ?? HibiscusRole.HACKER);
  const [choice, setChoice] = useState<RSVPChoice | null>(null);
  const hbc = container.resolve(HibiscusSupabaseClient);
  const client = hbc.getClient();

  const WelcomeHeader = () => (
    <div
      style={{
        display: 'inline-flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <WelcomeContainer>
        <H1
          style={{
            color: userColors.light,
            fontSize: '30px',
            textShadow: `0px 0px 10px ${userColors.standard}`,
          }}
        >
          Welcome, {user.firstName}
        </H1>
        <H3 style={{ color: '#989898' }}>What would you like to do today?</H3>
      </WelcomeContainer>
    </div>
  );

  const getApplicationStatus = () => {
    return (
      <span
        style={{
          backgroundColor:
            (user.applicationStatus === ApplicationStatus.NOT_APPLIED &&
              Colors2023.GRAY.DARK) ||
            (user.applicationStatus === ApplicationStatus.STARTED &&
              Colors2023.YELLOW.DARK) ||
            (user.applicationStatus === ApplicationStatus.ADMITTED &&
              Colors2023.GREEN.DARK) ||
            (user.applicationStatus === ApplicationStatus.NOT_ADMITTED &&
              Colors2023.RED.DARK) ||
            (user.applicationStatus === ApplicationStatus.IN_REVIEW &&
              Colors2023.BLUE.DARK),
          color:
            (user.applicationStatus === ApplicationStatus.NOT_APPLIED &&
              Colors2023.GRAY.LIGHT) ||
            (user.applicationStatus === ApplicationStatus.STARTED &&
              Colors2023.YELLOW.LIGHT) ||
            (user.applicationStatus === ApplicationStatus.ADMITTED &&
              Colors2023.GREEN.LIGHT) ||
            (user.applicationStatus === ApplicationStatus.NOT_ADMITTED &&
              Colors2023.RED.LIGHT) ||
            (user.applicationStatus === ApplicationStatus.IN_REVIEW &&
              Colors2023.BLUE.LIGHT),
          fontWeight: 500,
          padding: 8,
          borderRadius: 8,
          fontSize: '15px',
        }}
      >
        {(user.applicationStatus === ApplicationStatus.NOT_APPLIED &&
          'Not Applied') ||
          (user.applicationStatus === ApplicationStatus.STARTED &&
            'Application Started') ||
          (user.applicationStatus === ApplicationStatus.ADMITTED &&
            'Admitted') ||
          (user.applicationStatus === ApplicationStatus.NOT_ADMITTED &&
            'Not Admitted') ||
          (user.applicationStatus === ApplicationStatus.IN_REVIEW &&
            'In Review')}
      </span>
    );
  };

  const renderApplyMessage = () => {
    if (user.applicationStatus === ApplicationStatus.NOT_APPLIED) {
      return (
        <BannerContainer>
          <GlowSpan
            color={Colors2023.GRAY.LIGHT}
            shadowColor={Colors2023.BLUE.STANDARD}
            style={{ fontSize: 20 }}
          >
            You have not applied to HackSC 2023 yet!
          </GlowSpan>
          <ApplyButton>
            <Link
              href="/apply-2023"
              anchortagpropsoverride={{ target: '_self' }}
            >
              Apply now
            </Link>
          </ApplyButton>
        </BannerContainer>
      );
    }
  };

  const RSVPPlaceholder = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <CongratsMessage />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            color="red"
            onClick={() => {
              setChoice('DECLINE');
              setModalOpen(true);
            }}
          >
            DECLINE YOUR SPOT
          </Button>
          <Button
            color="black"
            onClick={() => {
              setChoice('ACCEPT');
              setModalOpen(true);
            }}
          >
            CONFIRM YOUR SPOT
          </Button>
        </div>
      </div>
    );
  };

  const DeclineSpotContent = () => (
    <GrayBox
      style={{
        maxWidth: '30rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div>
        <H2>Are you sure?</H2>
        <Text>
          Once submitted, you confirm that you will not be able to join HackSC
          2023. This action is irreversible.
        </Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          color="red"
          onClick={async (e) => {
            e.stopPropagation();
            setModalOpen(false);
            await client
              .from('user_profiles')
              .update({ attendance_confirmed: false })
              .eq('user_id', user.id);
            updateUser({ attendanceConfirmed: false });
          }}
        >
          CONFIRM
        </Button>
      </div>
    </GrayBox>
  );

  if (user.attendanceConfirmed === true) {
    return (
      <BattlepassAPIProvider mock={false}>
        <BattlepassPage />
      </BattlepassAPIProvider>
    );
  } else if (user.attendanceConfirmed === false) {
    return <DeclinedPlaceholder />;
  }

  return (
    <>
      <WelcomeHeader />
      {renderApplyMessage()}

      <div
        style={{
          display: 'flex',
          backgroundColor: '#3b3b3b',
          padding: 20,
          borderRadius: 10,
          marginTop: 20,
          boxShadow: `0px 0px 5px #8e8e8e`,
        }}
      >
        <GlowSpan color={Colors2023.GRAY.LIGHT} style={{ fontSize: 20 }}>
          Your Application Status: {getApplicationStatus()}
        </GlowSpan>
      </div>

      <MessageContainer>
        {user.applicationStatus === ApplicationStatus.ADMITTED ? (
          <>
            <Modal isOpen={modalOpen} closeModal={closeModal}>
              {choice === 'ACCEPT' && <RSVPForm closeModal={closeModal} />}
              {choice === 'DECLINE' && <DeclineSpotContent />}
            </Modal>
            <RSVPPlaceholder />
          </>
        ) : user.applicationStatus === ApplicationStatus.NOT_ADMITTED ? (
          <RejectionMessage />
        ) : (
          <ComingSoon />
        )}
      </MessageContainer>
    </>
  );
}

export default HackerPortal;

const ApplyButton = styled.button`
  cursor: pointer;
  background-color: #979797;
  color: #f4f4f4;
  font-weight: 500;
  padding: 8px;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  margin-left: 10px;

  &:hover {
    background-color: #6f9a28;
    color: #e9ffc5;
    transition: all 0.3s;
  }

  @media (max-width: 400px) {
    margin-left: 0px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-top: 50px;
`;

const BannerContainer = styled.div`
  display: flex;
  background-color: #3b3b3b;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0px 0px 5px #8e8e8e;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const WelcomeContainer = styled.div`
  @media (max-width: 400px) {
    margin-top: 5rem;
  }
`;
