import Link from 'next/link';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface NavbarProps {}

const StyledNavbar = styled.div`
  border-radius: 20px;
  border: 1px solid white;
  box-shadow: 1px 1px 1px 2px;
  width: 25%;
`;

export function SidebarNav(props: NavbarProps) {
  const sidebarItems: { name: string; url: string }[] = [
    { name: 'Pointr', url: '/Pointr' },
  ];

  return (
    <StyledNavbar>
      <ul>
        {sidebarItems.map((item, i) => {
          return (
            <LinkLi key={i}>
              <Link passHref href={item.url}>
                {item.name}
              </Link>
            </LinkLi>
          );
        })}
      </ul>
    </StyledNavbar>
  );
}

export default SidebarNav;

const LinkLi = styled.li`
  :active {
    color: blue;
  }
`;
