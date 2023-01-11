import { HibiscusUser } from '@hibiscus/types';
import React from 'react';
import styled from 'styled-components';
import PortalMenu from '../components/portal-menu/portal-menu';
import TopBar from '../components/top-bar/top-bar';

export interface PortalLayoutProps extends React.PropsWithChildren {
  user: HibiscusUser;
}

function PortalLayout({ children, user }: PortalLayoutProps) {
  if (user == null) {
    return <></>;
  }

  return (
    <MainPageWrapper>
      <TopBar userTag={user.tag} role={user.role} />
      <MenuLayoutWrapper>
        <MenuWrapper>
          <PortalMenu user={user} />
        </MenuWrapper>
        <ChildrenWrapper>{children}</ChildrenWrapper>
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
  padding: 20px;
  height: 100%;
`;

const MenuWrapper = styled.div`
  position: absolute;
  z-index: 999; // always on top
`;

const ChildrenWrapper = styled.div`
  height: 100%;
`;
