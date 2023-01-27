/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Link, Modal } from '@hibiscus/ui';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import { HibiscusUser } from '@hibiscus/types';
import { H1, H3 } from '@hibiscus/ui';
import Image from 'next/image';
import { ApplicationStatus } from '@hibiscus/types';
import { useState } from 'react';
import RSVPForm from '../rsvp-form/rsvp-form';
import ComingSoonBattlepassPlaceholder from '../battlepass/coming-soon-battlepass-placeholder';
import { ComingSoon } from './coming-soon';

interface Props {
  user: HibiscusUser;
}

export function HackerPortal({ user }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

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

  const ConfirmationPlaceholder = () => {
    return (
      <div>
        <Button color="black" onClick={() => setModalOpen(true)}>
          CONFIRM YOUR SPOT
        </Button>
      </div>
    );
  };

  if (user.attendanceConfirmed) {
    return (
      <>
        <ComingSoonBattlepassPlaceholder />
      </>
    );
  }

  return (
    <>
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
              <RSVPForm closeModal={closeModal} />
            </Modal>
            <ConfirmationPlaceholder />
          </>
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
  padding-top: 100px;
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
