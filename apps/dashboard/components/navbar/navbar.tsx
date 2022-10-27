import Link from 'next/link';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
  background-color: #d9d9d9;
  width: 25%;
`;

export function Navbar(props: NavbarProps) {
  return (
    <StyledNavbar>
      <ul>
        <li>
          <Link passHref href="/Pointr">
            Pointr
          </Link>
        </li>
        <li>
          <a>Hackerform</a>
        </li>
        <li>
          <a>Check-in</a>
        </li>
        <li>
          <Link passHref href="/hacker-manager">
            Hacker Manager
          </Link>
        </li>
      </ul>
    </StyledNavbar>
  );
}

export default Navbar;
