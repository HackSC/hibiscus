/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { H5, Link, Text } from '@hibiscus/ui';
import { ColorSpanBold, GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';

/* eslint-disable-next-line */
export interface DesktopNavbarProps {}

export function DesktopNavbar(props: DesktopNavbarProps) {
  return (
    <StyledDesktopNavbar>
      <NavbarLeftLogoText>
        <Link href={'/'} anchortagpropsoverride={{ target: '_self' }}>
          <LogoContainer>
            <img src="./img/logo.svg" alt="HackSC 2023 Logo" />
          </LogoContainer>
        </Link>
      </NavbarLeftLogoText>
      <RightMenuDiv>
        <Link href={'/'} anchortagpropsoverride={{ target: '_self' }}>
          <MenuOption>
            <H5>
              <ColorSpanBold color={Colors2023.PURPLE.STANDARD}>
                <GlowSpan
                  color={Colors2023.PURPLE.STANDARD}
                  shadowColor={Colors2023.PURPLE.STANDARD}
                >
                  Overview
                </GlowSpan>
              </ColorSpanBold>
            </H5>
          </MenuOption>
        </Link>
        <Link
          href={'https://team.hacksc.com'}
          anchortagpropsoverride={{ target: '_self' }}
        >
          <MenuOption>
            <H5>About our team</H5>
          </MenuOption>
        </Link>
        <DropdownMenu>
          <MenuOption>
            <H5>Previous Hackathons ▾</H5>
          </MenuOption>
          <DropdownContent>
            <DropdownContentItem>
              <Link href="https://2022.hacksc.com">
                <DropdownText>HackSC 2022</DropdownText>
              </Link>
            </DropdownContentItem>
            <DropdownContentItem>
              <Link href="https://2021.hacksc.com">
                <DropdownText>HackSC 2021</DropdownText>
              </Link>
            </DropdownContentItem>
            <DropdownContentItem>
              <Link href="https://2020.hacksc.com">
                <DropdownText>HackSC 2020</DropdownText>
              </Link>
            </DropdownContentItem>
          </DropdownContent>
        </DropdownMenu>
      </RightMenuDiv>
    </StyledDesktopNavbar>
  );
}

export default DesktopNavbar;

const StyledDesktopNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LogoContainer = styled.div`
  > img {
    width: 15rem;
  }
`;

const RightMenuDiv = styled.div`
  display: flex;
  align-items: center;
  padding-right: 5rem;
`;

const MenuOption = styled.div`
  color: ${Colors2023.GRAY.LIGHT};

  font-size: 1.5rem;
  font-weight: 400;
  padding: 1rem;
  transition: 0.3s;

  &:hover {
    background: ${Colors2023.GRAY.MEDIUM};
    border-radius: 0.4rem;
  }
`;

const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  min-width: 10rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s linear;
`;

const DropdownContentItem = styled.div`
  padding: 0;
  margin: 0.3rem;
  margin-left: 4rem;
  background: ${Colors2023.GRAY.STANDARD};
  width: 100%;
  text-align: center;
  border-radius: 0.4rem;
  transition: 0.3s;

  &:hover {
    background-color: ${Colors2023.GRAY.MEDIUM};
    margin-left: 2rem;
  }
`;

const DropdownText = styled(Text)`
  font-size: 1.1rem;
  font-weight: 400;
  color: ${Colors2023.GRAY.LIGHT};
  text-decoration: none;
  border: none;
  background: none;
  padding: 0.75rem;
  border-radius: 0.4rem;
`;

const DropdownMenu = styled.div`
  font-size: medium;
  cursor: pointer;
  position: relative;

  &:hover ${DropdownContent} {
    visibility: visible;
    opacity: 1;
  }
`;

const NavbarLeftLogoText = styled.h1`
  font-weight: 900;
  letter-spacing: -1.1px;
  font-size: 3rem;
  padding-left: 7rem;
`;
