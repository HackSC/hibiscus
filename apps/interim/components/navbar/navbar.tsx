import { TrademarkColors } from '@hacksc-platforms/styles';
import { Text } from '@hacksc-platforms/ui';
import Link from 'next/link';
import styled from 'styled-components';
import GradientSpan from '../gradient-span/gradient-span';

/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  const previousYearWebsiteLink = 'http://www.hacksc.com';
  const previousYearWebsiteDropdownTitle = 'HackSC 2022';

  return (
    <StyledNavbar>
      <NavbarLeftLogoText>
        <GradientSpan>HackSC</GradientSpan>
      </NavbarLeftLogoText>
      <RightMenuDiv>
        <DropdownMenu>
          <Text>Previous hackathons</Text>
          <DropdownContent>
            <DropdownContentItem>
              <Link passHref href={previousYearWebsiteLink}>
                {previousYearWebsiteDropdownTitle}
              </Link>
            </DropdownContentItem>
          </DropdownContent>
        </DropdownMenu>
      </RightMenuDiv>
    </StyledNavbar>
  );
}

export default Navbar;

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;

const RightMenuDiv = styled.div`
  display: flex;
  align-items: center;
`;

const RightMenuItemClickable = styled.button`
  padding: 0.2rem 1rem;
  margin: 0.5rem;
  font-size: medium;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 0.4rem;

  &:hover {
    background: #faf9f9;
  }

  &:focus {
    background: black;
    color: white;
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
  padding: 0.6rem 0.2rem;
  margin: 0.3rem 0;
  background: #faf9f9;
  width: 100%;
  border-radius: 0.4rem;

  &:hover {
    background-color: ${TrademarkColors.LIGHT_BLUE};
  }
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
  letter-spacing: -1.1px;
  font-size: xx-large;
`;
