import { GradientSpan, H5, Link, Text } from '@hacksc-platforms/ui';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DesktopNavbarProps {}

export function DesktopNavbar(props: DesktopNavbarProps) {
  return (
    <StyledDesktopNavbar>
      <NavbarLeftLogoText>
        <Link href={'/'} anchorTagPropsOverride={{ target: '_self' }}>
          <StyledText>HackSC{'\u00a0'}</StyledText>
        </Link>
      </NavbarLeftLogoText>
      <RightMenuDiv>
        <Link href="https://hacksc.com" passHref>
          <MenuOption>
            <H5>Overview</H5>
          </MenuOption>
        </Link>
        <Link href="https://team.hacksc.com" passHref>
          <MenuOption>
            <H5>
              <GradientSpan>Join Our Team</GradientSpan>
            </H5>
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

const StyledText = styled(GradientSpan)`
  letter-spacing: -0.25vw;
  @media (max-width: 1920px) {
    letter-spacing: -0.35vw;
  }
  font-weight: 700;
`;

const RightMenuDiv = styled.div`
  display: flex;
  align-items: center;
  padding-right: 5rem;
`;

const MenuOption = styled.div`
  color: #2b2b2b;
  border: none;
  background: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  padding: 1rem;
  transition: 0.3s;

  &:hover {
    background: #f3f3f3;
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
  background: #faf9f9;
  width: 100%;
  text-align: center;
  border-radius: 0.4rem;
  transition: 0.3s;

  &:hover {
    background-color: #e0e0e0;
    margin-left: 2rem;
  }
`;

const DropdownText = styled(Text)`
  font-size: 1.1rem;
  font-weight: 400;
  color: #2b2b2b;
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
