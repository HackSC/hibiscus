import Image from 'next/image';
import { H3, Text, Link } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import HackSCGuy from '../svg/hacksc-guy';
import styled from 'styled-components';
import { Colors } from '@hacksc/sctw-ui-kit';

export const CongratsMessage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        textAlign: 'left',
      }}
    >
      <HackSCGuy />
      <Heading3>Congratulations on being accepted to SoCal Tech Week!</Heading3>
      <TextBody>
        We are so excited to welcome you to our event this year, and hope that
        you will be able to attend. It’s going to be an amazing weekend with
        plenty of workshops, speakers, games, and of course, project building!
      </TextBody>
      <TextBody>
        Please complete this RSVP form{' '}
        <span style={{ fontWeight: 'bold' }}>
          within 4 days of your acceptance notification
        </span>{' '}
        to secure your spot at SoCal Tech Week. By submitting, you are
        committing to attending the event. If you do not submit this form by the
        posted deadline, your spot will be given to another hacker.
      </TextBody>
      <TextBody>
        We kindly remind you that no-shows after RSVPing mean that you are
        taking someone else’s opportunity to attend this event. If you are no
        longer able to attend the event after RSVPing, please email{' '}
        <Link
          href="mailto:team@hacksc.com"
          passHref
          underline
          anchortagpropsoverride={{
            style: { color: '#ff6347' },
          }}
        >
          team@hacksc.com
        </Link>{' '}
        at least 12 hours prior to the start of the event.
      </TextBody>
      <TextBody>
        HackSC is committed to providing participants with the best experience
        possible. If there’s anything we can do to improve your time at our
        event, please let us know!
      </TextBody>
    </div>
  );
};

const Heading3 = styled(H3)`
  color: #ff6347;
`;

const TextBody = styled.p`
  font-family: Inter;
  font-size: 25px;
  font-weight: 400;
  line-height: 30.26px;
  color: #ffb1a3;
`;
