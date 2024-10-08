import React from 'react';
import styled from 'styled-components';
import PortalMenu from '../components/portal-menu/portal-menu';
import TopBar from '../components/top-bar/top-bar';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import BottomBar from '../components/bottom-bar/bottom-bar';

export type PortalLayoutProps = React.PropsWithChildren;

function PortalLayout({ children }: PortalLayoutProps) {
  const { user } = useHibiscusUser();

  if (user == null) {
    return <></>;
  }

  return (
    <MainPageWrapper>
      {/* <StyledSideNav /> */}
      <TopBar userTag={user.tag} role={user.role} />
      <MenuLayoutWrapper>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </MenuLayoutWrapper>
      <BottomBar />
    </MainPageWrapper>
  );
}

export default PortalLayout;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const MenuLayoutWrapper = styled.div`
  position: relative;
  padding: 20px;
  height: 100%;
  flex: 1 1 auto;
`;

const MenuWrapper = styled.div`
  position: absolute;
  z-index: 999; // always on top
`;

const ChildrenWrapper = styled.div`
  height: 100%;
`;
