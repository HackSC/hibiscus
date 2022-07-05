import { TrademarkColors } from '@hacksc-platforms/styles';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <StyledNavbar>
      <NavbarLeftLogoText>HackSC</NavbarLeftLogoText>
      <RightMenuDiv>
        <RightMenuItemClickable>
          <GradientBoldedText>Overview</GradientBoldedText>
        </RightMenuItemClickable>
        <RightMenuItemClickable>
          <p>Sponsor us</p>
        </RightMenuItemClickable>
        <RightMenuItemClickable>
          <p>Previous hackathons</p>
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
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 0.4rem;

  &:hover {
    background: #f0f0f0;
  }
`;

const NavbarLeftLogoText = styled.h1`
  background: linear-gradient(
    to right,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  letter-spacing: -1.1px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GradientBoldedText = styled.p`
  font-weight: 700;
  background: linear-gradient(
    to right,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
