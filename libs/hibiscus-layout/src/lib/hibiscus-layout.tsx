import { Colors, Text } from '@hacksc/sctw-ui-kit';
import { logout } from '@hibiscus/sso-client';
import { HibiscusRole } from '@hibiscus/types';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { SponsorServiceAPI } from '@hibiscus/sponsor-service-api';
import Image from 'next/image';
import SideNav from './components/side-nav';
import { useHibiscusUser } from '@hibiscus/hibiscus-user-context';
import { useRouter } from 'next/router';
import { useMemo, useState, useEffect } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import {
  MdOutlineCalendarViewMonth,
  MdStarOutline,
  MdOutlinePeopleAlt,
  MdOutlinePlaylistAddCheck,
} from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

export type ThemelessLayoutProps = React.PropsWithChildren;

export function ThemelessLayout({ children }: ThemelessLayoutProps) {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

  const { user } = useHibiscusUser();
  const color = useMemo(() => {
    if (user == null) return Colors.Yellow.ArthurSweater;
    if (user.role === HibiscusRole.HACKER) return Colors.Red.Redward;
    if (user.role === HibiscusRole.VOLUNTEER) return Colors.Red.Redward;
    if (user.role === HibiscusRole.SPONSOR) return Colors.Red.Redward;
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
        { name: 'Profile', url: '/hacker-profile', image: FaRegUserCircle },
        {
          name: 'Hacker Packet',
          url: '/hacker-packet',
          image: IoDocumentTextOutline,
        },
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
          url: '/identity-portal/event-checkin',
          image: MdOutlinePlaylistAddCheck,
        },
      ];
    if (user.role === HibiscusRole.SPONSOR)
      return [
        {
          name: 'Events',
          url: '/sponsor-booth',
          image: MdOutlineCalendarViewMonth,
        },
        {
          name: 'Hacker Attendees',
          url: '/participant-database',
          image: MdOutlinePeopleAlt,
        },
        {
          name: 'Event Check-in',
          url: '/identity-portal/event-checkin',
          image: MdOutlinePlaylistAddCheck,
        },
      ];
    if (user.role == HibiscusRole.JUDGE)
      return [
        {
          name: 'Judging Portal',
          url: '/podium/pages',
          image: FaRegUserCircle,
        },
      ];
  }, [user]);

  const [companyName, setCompanyName] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await SponsorServiceAPI.getCompanyIdAndEventId(user.id);
      if (data.data != null) {
        setCompanyName(data.data.data.company_name);
      }
    };

    if (user != null && user.role === HibiscusRole.SPONSOR) {
      fetchData();
    }
  }, [user]);

  const router = useRouter();
  const pageTitle = useMemo(() => {
    const map = {
      '/leaderboard': 'Leaderboard',
      '/identity-portal/attendee-details-scan': 'Identity Portal',
      '/identity-portal/attendee-details': 'Attendee Details',
      '/identity-portal/attendee-event-scan': 'Event Check-in',
      '/identity-portal/event-checkin': 'Event Check-in',
      '/hacker-profile': 'Profile',
      '/': 'Judging Portal',
      '/sponsor-booth': companyName ? `Welcome ${companyName}` : 'Welcome',
    };
    return map[router.pathname] ?? '';
  }, [router, companyName]);

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
              <GlowSpan color={color}>{user.role}</GlowSpan>
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

  // height: 100%;
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
