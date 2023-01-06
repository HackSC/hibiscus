import styled from 'styled-components';
import DesktopNavbar from './desktop-navbar/desktop-navbar';
import MobileNavbar from './mobile-navbar/mobile-navbar';

/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <FixedToTop>
      <DesktopNavbarWrapper>
        <DesktopNavbar />
      </DesktopNavbarWrapper>
      <MobileNavbarWrapper>
        <MobileNavbar />
      </MobileNavbarWrapper>
    </FixedToTop>
  );
}

export default Navbar;

const FixedToTop = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
`;

const DesktopNavbarWrapper = styled.div`
  display: flex;
  touch-action: auto;
  @media only screen and (max-width: 1080px) {
    display: none !important;
    touch-action: none !important;
  }
`;

const MobileNavbarWrapper = styled.div`
  display: none;
  touch-action: none;
  @media screen and (max-width: 1080px) {
    display: flex !important;
    touch-action: auto !important;
  }
`;
