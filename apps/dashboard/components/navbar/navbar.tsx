import Link from 'next/link';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface NavbarProps {
  highlighter: string;
}

const StyledNavbar = styled.div`
  background-color: #d9d9d9;
  width: 25%;
`;

export function Navbar(props: NavbarProps) {
  let pointrColor = 'black';
  let hackerManagerColor = 'black';
  let hackerFormColor = 'black';
  let checkInColor = 'black';
  if (props.highlighter == 'pointr') {
    pointrColor = '#4799E4';
  } else if (props.highlighter == 'hacker-manager') {
    hackerManagerColor = '#4799E4';
  } else if (props.highlighter == 'hackerform') {
    hackerFormColor = '#4799E4';
  } else if (props.highlighter == 'checkin') {
    checkInColor = '#4799E4';
  }
  return (
    <StyledNavbar>
      <ul>
        <li style={{ color: pointrColor }}>
          <Link passHref href="/Pointr">
            Pointr
          </Link>
        </li>
        <li style={{ color: hackerFormColor }}>
          <Link passHref href="/hackerform">
            Hackerform
          </Link>
        </li>
        <li style={{ color: checkInColor }}>
          <Link passHref href="/check-in">
            Check-in
          </Link>
        </li>
        <li style={{ color: hackerManagerColor }}>
          <Link passHref href="/hacker-manager">
            Hacker Manager
          </Link>
        </li>
      </ul>
    </StyledNavbar>
  );
}

export default Navbar;
