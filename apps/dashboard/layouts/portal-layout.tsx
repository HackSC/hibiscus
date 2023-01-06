import React from 'react';
import styled from 'styled-components';
import PortalMenu from '../components/portal-menu/portal-menu';
import TopBar from '../components/top-bar/top-bar';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';

export type PortalLayoutProps = React.PropsWithChildren;

function PortalLayout({ children }: PortalLayoutProps) {
  const { user } = useHibiscusUser();

  return (
    <MainPageWrapper>
      <TopBar userTag={user.tag} role={user.role} />
      <MenuLayoutWrapper>
        <MenuWrapper>
          <PortalMenu />
        </MenuWrapper>
        <LayoutWrapper>{children}</LayoutWrapper>
      </MenuLayoutWrapper>
    </MainPageWrapper>
  );
}

export default PortalLayout;

const MainPageWrapper = styled.div`
  height: 88vh;
`;

const MenuLayoutWrapper = styled.div`
  height: 100%;
  position: relative;
  padding: 20px;
`;

const MenuWrapper = styled.div`
  position: absolute;
  z-index: 999; // always on top
`;

const LayoutWrapper = styled.div`
  height: 100%;
`;
