/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { Link } from '@hibiscus/ui';
import { Colors2023 } from '@hibiscus/styles';
import { HibiscusUser } from '@hibiscus/types';
import { H1, H2, H3 } from '@hibiscus/ui';
import Image from 'next/image';

interface Props {
  user: HibiscusUser;
}

export function SponsorPortal({ user }: Props) {
  return (
    <Wrapper>
      <WelcomeContainer>
        <H1
          style={{
            color: Colors2023.GREEN.STANDARD,
            fontSize: '40px',
            textShadow: `0px 0px 10px ${Colors2023.GREEN.DARK}`,
          }}
        >
          Welcome, {user.firstName}, to HackSC!
        </H1>
      </WelcomeContainer>
      <MenuContainer>
        <StyledButton color={'black'}>
          <Link
            href="/sponsor-booth"
            anchortagpropsoverride={{ target: '_self' }}
          >
            <H1
              style={{
                color: Colors2023.GRAY.LIGHT,
                fontSize: '25px',
                padding: '10px',
              }}
            >
              My Booth
            </H1>
            <Image
              width="220"
              height="200"
              src={'/hackform-illustrations/earth.svg'}
              alt="Illustration"
            />
          </Link>
        </StyledButton>
        <StyledButton color={'black'}>
          <Link href="https://docs.google.com/document/d/1uDLBfm1hC7OTe9hNyTBbp2Gdje-GSuRK8KeRz7JOOaw/edit#">
            <H1
              style={{
                color: Colors2023.GRAY.LIGHT,
                fontSize: '25px',
                padding: '10px',
              }}
            >
              Representative Packet
            </H1>
            <Image
              width="220"
              height="200"
              src={'/hackform-illustrations/detective-curious.svg'}
              alt="Illustration"
            />
          </Link>
        </StyledButton>
        {/* <StyledButton color={'black'}>
          <Link
            href="/company-config"
            anchortagpropsoverride={{ target: '_self' }}
          >
            <H1
              style={{
                color: Colors2023.GRAY.LIGHT,
                fontSize: '25px',
                padding: '10px',
              }}
            >
              Company Configurations
            </H1>
            <Image
              width="220"
              height="200"
              src={'/hackform-illustrations/heart-flying.svg'}
              alt="Illustration"
            />
          </Link>
        </StyledButton> */}
      </MenuContainer>
    </Wrapper>
  );
}

export default SponsorPortal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;
`;

const WelcomeContainer = styled.div`
  @media (max-width: 400px) {
    margin-top: 2rem;
  }
`;

const MenuContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 340px;
  height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors2023.GRAY.STANDARD};
  box-shadow: 1px 2px 15px ${Colors2023.GRAY.MEDIUM};
  border-radius: 10px;
  border: 3px solid ${Colors2023.GRAY.MEDIUM};
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${Colors2023.GRAY.SCHEMDIUM};
    transition: all 0.3s;
  }
`;
