import React from 'react';
import styled from 'styled-components';
import PortalMenu from '../components/portal-menu/portal-menu';
import TopBar from '../components/top-bar/top-bar';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';

export type PortalLayoutProps = React.PropsWithChildren;

function PortalLayout({ children }: PortalLayoutProps) {
  const { user } = useHibiscusUser();

  if (user == null) {
    return <></>;
  }

  return (
    <MainPageWrapper>
      <MenuLayoutWrapper>
        <PortalMenu />
        <MenuWrapper>
          <TopBar userTag={user.tag} role={user.role} />
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </MenuWrapper>
      </MenuLayoutWrapper>
    </MainPageWrapper>
  );
}

export default PortalLayout;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MenuLayoutWrapper = styled.div`
  position: relative;
  display: flex;

  height: 100%;
`;

const MenuWrapper = styled.div`
  z-index: 999; // always on top
  background: var(--Arthurs-Sweater, #ecb400);
`;

const ChildrenWrapper = styled.div`
  height: 100%;
`;
