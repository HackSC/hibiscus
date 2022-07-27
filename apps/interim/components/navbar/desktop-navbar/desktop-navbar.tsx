import { TrademarkColors } from '@hacksc-platforms/styles';
import { GradientSpan } from '@hacksc-platforms/ui';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DesktopNavbarProps {}

export function DesktopNavbar(props: DesktopNavbarProps) {
  return (
    <StyledDesktopNavbar>
      <NavbarLeftLogoText>
        <GradientSpan>HackSC</GradientSpan>
      </NavbarLeftLogoText>
      <RightMenuDiv>
        <MenuOption>Overview</MenuOption>
        {/* <MenuOption>Sponsor Us</MenuOption> */}
        <a href="https://team.hacksc.com" target="_blank" rel="noreferrer"><MenuOption>Join Us</MenuOption></a>
        <DropdownMenu>
          <MenuOption>Previous Hackathons ▾</MenuOption>
          <DropdownContent>
            <DropdownContentItem>
              <a href='https://2022.hacksc.com' target='_blank' rel='noreferrer'>
                <DropdownLink>HackSC 2022</DropdownLink>
              </a>
            </DropdownContentItem>
            <DropdownContentItem>
              <a href='https://2021.hacksc.com' target='_blank' rel='noreferrer'>
                <DropdownLink>HackSC 2021</DropdownLink>
              </a>
            </DropdownContentItem>
            <DropdownContentItem>
              <a href='https://2020.hacksc.com' target='_blank' rel='noreferrer'>
                <DropdownLink>HackSC 2020</DropdownLink>
              </a>
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

const RightMenuDiv = styled.div`
  display: flex;
  align-items: center;
  padding-right: 5rem;
`;

const MenuOption = styled.button`
  color: #2b2b2b;
  border: none;
  background: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  padding: 1rem;
  &:hover {
    background: #f3f3f3;
    border-radius: 0.4rem;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  flex-direction: column;
  align-items: center;
  min-width: 10rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
`;

const DropdownContentItem = styled.div`
  padding: 0;
  margin: 0.3rem;
  margin-left: 6rem;
  background: #faf9f9;
  width: 100%;
  text-align: center;
  border-radius: 0.4rem;
  &:hover {
    background-color: ${TrademarkColors.LIGHT_BLUE};
  }
`;

const DropdownLink = styled.button`
  font-family: Inter, sans-serif;
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
    display: flex;
  }
`;

const NavbarLeftLogoText = styled.h1`
  font-weight: 900;
  letter-spacing: -1.1px;
  font-size: 3rem;
  padding-left: 7rem;
`;

