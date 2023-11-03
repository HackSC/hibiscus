import React from 'react';
import styled from 'styled-components';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import StyledSideNav from '../components/nav/side-nav';
import { Colors, Text } from '@hacksc/sctw-ui-kit';
import { logout } from '@hibiscus/sso-client';
import Image from 'next/image';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { HibiscusRole } from '@hibiscus/types';
import { Colors2023 } from '@hibiscus/styles';
import { useMediaQuery } from 'react-responsive';
import StyledTopNav from '../components/nav/top-nav';

export type ThemelessLayoutProps = React.PropsWithChildren;

function ThemelessLayout({ children }: ThemelessLayoutProps) {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

  const { user } = useHibiscusUser();

  if (user == null) {
    return <></>;
  }

  return isSmallScreen ? (
    <VerticalMainPageWrapper>
      <StyledTopNav />
      <VerticalContent>{children}</VerticalContent>
    </VerticalMainPageWrapper>
  ) : (
    <MainPageWrapper>
      <StyledSideNav />
      <Content>
        <RightUtilityContainer>
          <UserText>{user.tag}</UserText>
          <RoleText>
            <GlowSpan
              color={Colors.Yellow.ArthurSweater}
              shadowColor={Colors.Yellow.Yuhlow}
            >
              {user.role}
            </GlowSpan>
          </RoleText>
          <LogoutButton onClick={logout}>
            <Image
              style={{ position: 'relative', top: 3 }}
              width="18"
              height="18"
              src="/log-out.svg"
              alt="Log out of Hibiscus"
            />
          </LogoutButton>
        </RightUtilityContainer>

        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Content>
    </MainPageWrapper>
  );
}

export default ThemelessLayout;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
  background-color: ${Colors.Yellow.ArthurSweater};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  background-color: white;
  border-radius: 30px 0 0 30px;

  padding: 40px;

  gap: 20px;

  flex-grow: 1;
  flex-shrink: 1;
`;

const UserText = styled(Text)`
  color: black;
`;

const LogoutButton = styled.button`
  cursor: pointer;
  background: none;
  padding: 0;
`;

const RoleText = styled(Text)`
  font-weight: bold;
  letter-spacing: 3px;
`;

const RightUtilityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
`;

const ChildrenWrapper = styled.div`
  height: 100%;
  max-height: 100%;
`;

const VerticalMainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${Colors.Yellow.ArthurSweater};
`;

const VerticalContent = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  background-color: white;
  border-radius: 30px 30px 0 0;

  padding: 40px;

  gap: 20px;
`;
