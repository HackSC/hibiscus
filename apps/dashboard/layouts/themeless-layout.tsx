import React, { useMemo } from 'react';
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
import SideNav from '../components/nav/side-nav2';
import {
  MdOutlineCalendarViewMonth,
  MdOutlinePeopleAlt,
  MdOutlinePlaylistAddCheck,
  MdStarOutline,
} from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

export type ThemelessLayoutProps = React.PropsWithChildren;

function ThemelessLayout({ children }: ThemelessLayoutProps) {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

  const { user } = useHibiscusUser();
  const color = useMemo(() => {
    if (user == null) return Colors.Yellow.ArthurSweater;
    if (user.role === HibiscusRole.HACKER) return Colors.Red.Redward;
    if (user.role === HibiscusRole.VOLUNTEER) return Colors.Red.Redward;
    if (user.role === HibiscusRole.SPONSOR) return Colors.Red.DonatedBlood;
    return Colors.Yellow.ArthurSweater;
  }, [user]);
  const shadowColor = useMemo(() => {
    if (user == null) return Colors.Yellow.Yuhlow;
    if (user.role === HibiscusRole.HACKER) return Colors.Yellow.Yuhlow;
    if (user.role === HibiscusRole.SPONSOR) return Colors.Red.Redward;
    return Colors.Yellow.Yuhlow;
  }, [user]);
  const navbarOptions = useMemo(() => {
    if (user == null) return [];
    if (user.role === HibiscusRole.HACKER)
      return [
        { name: 'Events', url: '/events', image: MdOutlineCalendarViewMonth },
        { name: 'Leaderboard', url: '/leaderboard', image: MdStarOutline },
        { name: 'Profile', url: '/profile', image: FaRegUserCircle },
      ];
    if (user.role === HibiscusRole.VOLUNTEER)
      return [
        {
          name: 'Identity Portal',
          url: '/identity-portal/attendee-details-scan',
          image: MdOutlinePeopleAlt,
        },
        {
          name: 'Event Check-in',
          url: '/identity-portal/attendee-event-scan',
          image: MdOutlinePlaylistAddCheck,
        },
      ];
    return [];
  }, [user]);

  const router = useRouter();
  const pageTitle = useMemo(() => {
    const map = {
      '/leaderboard': 'Leaderboard',
      '/identity-portal/attendee-details-scan': 'Identity Portal',
      '/identity-portal/attendee-details': 'Identity Portal',
      '/identity-portal/attendee-event-scan': 'Event Check-in',
      '/identity-portal/event-checkin': 'Event Check-in',
    };
    return map[router.pathname] ?? '';
  }, [router]);

  if (user == null || router == null) {
    return <></>;
  }

  return (
    <MainPageWrapper>
      <SideNav options={navbarOptions} />
      <Content>
        <div className="flex flex-col px-[40px] pt-[40px] pb-[20px] gap-[10px]">
          <RightUtilityContainer>
            <UserText>{user.tag}</UserText>
            <RoleText>
              <GlowSpan color={color} shadowColor={shadowColor}>
                {user.role}
              </GlowSpan>
            </RoleText>
            <LogoutButton onClick={logout}>
              <Image
                width="18"
                height="18"
                src="/log-out.svg"
                alt="Log out of Hibiscus"
              />
            </LogoutButton>
          </RightUtilityContainer>
          <h1 className="m-0">{pageTitle}</h1>
        </div>
        <hr />
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Content>
    </MainPageWrapper>
  );
  /* isSmallScreen ? (
    <VerticalMainPageWrapper style={{ backgroundColor: color }}>
      <StyledTopNav />
      <VerticalContent>{children}</VerticalContent>
    </VerticalMainPageWrapper>
  ) : */
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
  min-height: 100vh;
  background-color: white;
  // border-radius: 30px 0 0 30px;

  // padding: 40px;

  // gap: 20px;

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
  font-weight: bold !important;
  letter-spacing: 3px !important;
`;

const RightUtilityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
  // padding: 40px 40px 0;
`;

const ChildrenWrapper = styled.div`
  height: 100%;
  max-height: 100%;
  padding: 40px;
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
