import { Colors2023 } from '@hibiscus/styles';
import { Text } from '@hibiscus/ui';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export function IdentityPortal() {
  const router = useRouter();

  return (
    <OptionsRow>
      <OptionCard onClick={() => router.push('/identity-portal/check-in')}>
        <LabelText>Check-in</LabelText>
        <Image
          src="/hackform-illustrations/purple-planet-stand.svg"
          width={150}
          height={150}
          alt=""
        />
      </OptionCard>

      <OptionCard
        onClick={() => router.push('/identity-portal/attendee-details-scan')}
      >
        <LabelText>Attendee Details</LabelText>
        <Image
          src="/hackform-illustrations/detective-curious.svg"
          width={150}
          height={150}
          alt=""
        />
      </OptionCard>

      <OptionCard
        onClick={() => router.push('/identity-portal/event-check-in')}
      >
        <LabelText>Event-specific Check-in</LabelText>
        <Image
          src="/hackform-illustrations/heart-flying.svg"
          width={150}
          height={150}
          alt=""
        />
      </OptionCard>
    </OptionsRow>
  );
}

export default IdentityPortal;

const OptionsRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;

  width: 100%;
`;

const OptionCard = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-between;

  width: 300px;

  padding: 1.5em 2.5em 2.5em 2.5em;
  margin: 1em 0;
  gap: 1em;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: thick solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 9px;

  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: ${Colors2023.GRAY.MEDIUM};
  }

  &:active {
    background-color: ${Colors2023.GRAY.DARK};
  }
`;

const LabelText = styled(Text)`
  font-size: 1.5em;
`;
