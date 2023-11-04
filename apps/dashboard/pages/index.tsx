import styled from 'styled-components';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import { ApplicationStatus, HibiscusRole } from '@hibiscus/types';
import HackerPortal from '../components/hacker-portal/hacker-portal';
import IdentityPortal from '../components/identity-portal/identity-portal';
import SponsorPortal from '../components/sponsor-portal/sponsor-portal';
import { GetServerSideProps } from 'next';
import AppsClosedPlaceholder from '../components/hacker-portal/apps-closed-placeholder';
import { isHackerPostAppStatus } from '../common/utils';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '../hooks/redux/hooks';
import { removeTabRoute } from '../store/menu-slice';
import RSVPClosedPlaceholder from '../components/hacker-portal/rsvp-closed-placeholder';
import { get } from '@vercel/edge-config';
import { useRouter } from 'next/router';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';

const RSVP_PERIOD = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds

interface ServerSideProps {
  appsOpen: boolean;
  waitlistOpen: boolean;
  hackerPortalOpen: boolean;
}

export function Index({ appsOpen, waitlistOpen }: ServerSideProps) {
  const dispatch = useAppDispatch();
  const { supabase } = useHibiscusSupabase();
  const { user } = useHibiscusUser();

  const [hackerPortalOpen, setHackerPortalOpen] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user != null) {
        const { data, error } = await supabase
          .getClient()
          .from('participants')
          .select('wristband_id')
          .eq('id', user.id);

        if (error != null) {
          console.log(error.message);
          return;
        }

        console.log(data);

        setHackerPortalOpen(
          data?.[0]?.wristband_id !== null &&
            data?.[0]?.wristband_id !== undefined
        );
      }
    };

    fetchData();
  }, [user]);

  const router = useRouter();

  const [rsvpFormOpen, setRsvpFormOpen] = useState<boolean | null>(true);

  useEffect(() => {
    if (!appsOpen) {
      dispatch(removeTabRoute('/apply-2023-x'));
    }
  }, [appsOpen, dispatch]);

  // useEffect(() => {
  //   if (user != null) {
  //     if (user.applicationStatusLastChanged !== undefined) {
  //       setRsvpFormOpen(
  //         new Date().valueOf() - user.applicationStatusLastChanged.valueOf() <=
  //           RSVP_PERIOD
  //       );
  //     } else {
  //       setRsvpFormOpen(true);
  //     }
  //   }
  // }, [user]);

  if (user == null || rsvpFormOpen === null) {
    return <>Loading</>;
  }

  const Dashboard = () => {
    if (user.role === HibiscusRole.HACKER) {
      if (
        !appsOpen &&
        !waitlistOpen &&
        !isHackerPostAppStatus(user.applicationStatus)
      ) {
        return <AppsClosedPlaceholder />;
      } else if (
        user.applicationStatus === ApplicationStatus.ADMITTED &&
        user.attendanceConfirmed === null &&
        !rsvpFormOpen
      ) {
        return <RSVPClosedPlaceholder />;
      }
      return (
        <HackerPortal isEventOpen={hackerPortalOpen} appsOpen={appsOpen} />
      );
    } else if (user.role === HibiscusRole.SPONSOR) {
      router.push('/sponsor-booth');
      return <></>;
    } else if (user.role === HibiscusRole.JUDGE) {
      window.location.replace('https://podium.hacksc.com');
      return <></>;
    } else if (user.role === HibiscusRole.VOLUNTEER) return <IdentityPortal />;
  };

  return (
    <Wrapper>
      <LayoutContainer>
        <Dashboard />
      </LayoutContainer>
    </Wrapper>
  );
}

export default Index;

const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LayoutContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const appsOpen = await get('APPS_OPEN_HACKSC_X_2023');
  const waitlistOpen = await get('APPS_WAITLIST_OPEN_HACKSC_X_2023');
  const hackerPortalOpen = await get('HACKER_PORTAL_OPEN_HACKSC_X_2023');

  return {
    props: {
      appsOpen,
      hackerPortalOpen,
      waitlistOpen,
    } as ServerSideProps,
  };
};
