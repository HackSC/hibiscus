import { Text } from '@hacksc-platforms/ui';
import styled from 'styled-components';
import GradientSpan from '../gradient-span/gradient-span';

/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <StyledNavbar>
      <NavbarLeftLogoText>
        <GradientSpan>HackSC</GradientSpan>
      </NavbarLeftLogoText>
      <RightMenuDiv>
        <RightMenuItemClickable>
          <Text>
            <GradientSpan>Overview</GradientSpan>
          </Text>
        </RightMenuItemClickable>
        <RightMenuItemClickable>
          <Text>Sponsor us</Text>
        </RightMenuItemClickable>
        <RightMenuItemClickable>
          <Text>Previous hackathons</Text>
        </RightMenuItemClickable>
      </RightMenuDiv>
    </StyledNavbar>
  );
}

export default Navbar;

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
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
`;

const NavbarLeftLogoText = styled.h1`
  letter-spacing: -1.1px;
  font-size: xx-large;
`;
