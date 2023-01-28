import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import { H1, H3 } from '@hibiscus/ui';
import Image from 'next/image';
import styled from 'styled-components';

export const ComingSoon = () => {
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
      <H3>Keep an eye out for more stuff to come.</H3>
      <Image
        src={'/assets/earth-suitcase-moon.svg'}
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
`;
