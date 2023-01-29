import Image from 'next/image';
import { H3, Text, Link } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';

export const CongratsMessage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Image
        src="/hackform-illustrations/heart.svg"
        width={100}
        height={100}
        alt="Heart character"
      />
      <H3>Congratulations on being accepted to HackSC 2023!</H3>
      <Text>
        We are so excited to welcome you to our event this year, and hope that
        you will be able to attend. It’s going to be an amazing weekend with
        plenty of workshops, speakers, games, and of course, project building!
      </Text>
      <Text>
        Please complete this RSVP form by{' '}
        <GlowSpan style={{ fontWeight: 'bold' }}>
          February 1st, 2023 at 11:59pm
        </GlowSpan>{' '}
        to secure your spot at HackSC 2023. By submitting, you are committing to
        attending the event. If you do not submit this form by the posted
        deadline, your spot will be given to another hacker.
      </Text>
      <Text>
        We kindly remind you that no-shows after RSVPing mean that you are
        taking someone else’s opportunity to attend this event. If you are no
        longer able to attend the event after RSVPing, please email{' '}
        <Link
          href="mailto:team@hacksc.com"
          passHref
          underline
          anchortagpropsoverride={{
            style: { color: Colors2023.BLUE.STANDARD },
          }}
        >
          team@hacksc.com
        </Link>{' '}
        at least 12 hours prior to the start of the event.
      </Text>
      <Text>
        HackSC is committed to providing participants with the best experience
        possible. If there’s anything we can do to improve your time at our
        event, please let us know!
      </Text>
    </div>
  );
};
