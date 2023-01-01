import { H1, H3, Link } from '@hibiscus/ui';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';

import Image from 'next/image';
import { Colors2023 } from '@hibiscus/styles';
import PortalLayout from '../../layouts/portal-layout';
import styled from 'styled-components';

export function Index() {
  return (
    <PortalLayout>
      <MainPageWrapper>
        <Wrapper>
          <H1 style={{ fontSize: '40px', lineHeight: '40px' }}>
            <GlowSpan
              color={Colors2023.BLUE.LIGHT}
              shadowColor={Colors2023.BLUE.STANDARD}
            >
              Oops!
            </GlowSpan>
          </H1>
          <H3>This page does not seem to exist</H3>
          {/* <Button color="black" style={{ display: 'flex' }}>Go to Home</Button> */}
          <ButtonWrapper>
            <Link href="/" anchortagpropsoverride={{ target: '_self' }}>
              <Button color="black">Go to Home</Button>
            </Link>
          </ButtonWrapper>
        </Wrapper>

        <Image
          src={'/assets/earth-suitcase-moon.svg'}
          width={200}
          height={200}
          alt="Earth-like character wearing shades pulling baggage and a moon"
        />
      </MainPageWrapper>
    </PortalLayout>
  );
}

export default Index;

const MainPageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
`;
