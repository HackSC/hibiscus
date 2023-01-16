/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Link } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import { HibiscusUser } from '@hibiscus/types';
import { H1, H3 } from '@hibiscus/ui';
import Image from 'next/image';
import { ApplicationStatus } from 'libs/types/src/lib/application-status';

interface Props {
  user: HibiscusUser;
}

export function HackerPortal({ user }: Props) {
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
            (user.applicationId && Colors2023.BLUE.DARK),
          color:
            (user.applicationStatus === ApplicationStatus.NOT_APPLIED &&
              Colors2023.GRAY.LIGHT) ||
            (user.applicationStatus === ApplicationStatus.STARTED &&
              Colors2023.YELLOW.LIGHT) ||
            (user.applicationStatus === ApplicationStatus.ADMITTED &&
              Colors2023.GREEN.LIGHT) ||
            (user.applicationStatus === ApplicationStatus.NOT_ADMITTED &&
              Colors2023.RED.LIGHT) ||
            (user.applicationId && Colors2023.BLUE.LIGHT),
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
          (user.applicationId && 'In Review')}
      </span>
    );
  };

  const renderApplyMessage = () => {
    if (user.applicationStatus === ApplicationStatus.NOT_APPLIED) {
      return (
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
          <GlowSpan
            color={Colors2023.GRAY.LIGHT}
            shadowColor={Colors2023.BLUE.STANDARD}
            style={{ fontSize: 20 }}
          >
            We have noticed you have not applied to HackSC 2023 yet!
          </GlowSpan>
          <ApplyButton>
            <Link
              href="/apply-2023"
              anchortagpropsoverride={{ target: '_self' }}
            >
              Apply now
            </Link>
          </ApplyButton>
        </div>
      );
    }
  };

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
        <H1 style={{ fontSize: '50px', lineHeight: '60px' }}>
          <GlowSpan
            color={Colors2023.BLUE.LIGHT}
            shadowColor={Colors2023.BLUE.STANDARD}
          >
            Coming Soon!
          </GlowSpan>
        </H1>
        <H3>Keep an eye out for more stuff to come.</H3>
        <Image
          src={'/assets/earth-suitcase-moon.svg'}
          width={200}
          height={200}
          alt="Earth-like character wearing shades pulling baggage and a moon"
        />
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
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-top: 100px;
`;
