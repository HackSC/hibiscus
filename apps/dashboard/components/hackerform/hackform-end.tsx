import { Colors2023 } from '@hacksc-platforms/styles';
import { FormMetadata } from '@hacksc-platforms/types';
import { H1, H3, Link } from '@hacksc-platforms/ui';
import { Button } from '@hacksc-platforms/ui-kit-2023';
import { GlowSpan } from '@hacksc-platforms/ui-kit-2023';
import Image from 'next/image';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HackformEndingProps {
  formMetadata: FormMetadata;
}

const HackformEnding = ({ formMetadata }: HackformEndingProps) => {
  return (
    <Wrapper>
      <H1>
        <GlowSpan
          color={Colors2023.GRAY.LIGHT}
          shadowColor={Colors2023.BLUE.DARK}
        >
          {formMetadata.end.title}
        </GlowSpan>
      </H1>
      <H3>{formMetadata.end.subtitle}</H3>
      <Image
        src={'/assets/earth-suitcase-moon.svg'}
        width={200}
        height={200}
        alt="Earth-like character wearing shades pulling baggage and a moon"
      />
      <Link href="/" anchortagpropsoverride={{ target: '_self' }}>
        <Button color="blue">Go to Home</Button>
      </Link>
    </Wrapper>
  );
};

export default HackformEnding;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  gap: 20px;
  width: 80%;
`;
