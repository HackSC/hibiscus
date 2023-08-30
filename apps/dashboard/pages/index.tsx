import styled from 'styled-components';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import { ApplicationStatus, HibiscusRole } from '@hibiscus/types';
import HackerPortal from '../components/hacker-portal/hacker-portal';
import IdentityPortal from '../components/identity-portal/identity-portal';
import SponsorPortal from '../components/sponsor-portal/sponsor-portal';
import { GetServerSideProps } from 'next';
import AppsClosedPlaceholder from '../components/hacker-portal/apps-closed-placeholder';
import { isHackerPostAppStatus } from '../common/utils';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux/hooks';
import { removeTabRoute } from '../store/menu-slice';
import RSVPClosedPlaceholder from '../components/hacker-portal/rsvp-closed-placeholder';
import { container } from 'tsyringe';
import { FeatureFlagRepository } from '../repository/feature-flag.repository';

interface ServerSideProps {
  appsOpen: boolean;
  rsvpFormOpen: boolean;
}

export function Index({ appsOpen, rsvpFormOpen }: ServerSideProps) {
  const dispatch = useAppDispatch();
  const { user } = useHibiscusUser();

  useEffect(() => {
    if (!appsOpen) {
      dispatch(removeTabRoute('/apply-2023'));
    }
  }, [appsOpen, dispatch]);

  if (user == null) {
    return <>Loading</>;
  }

  const Dashboard = () => {
    if (user.role === HibiscusRole.HACKER) {
      if (!appsOpen && !isHackerPostAppStatus(user.applicationStatus)) {
        return <AppsClosedPlaceholder />;
      } else if (
        user.applicationStatus === ApplicationStatus.ADMITTED &&
        user.attendanceConfirmed === null &&
        !rsvpFormOpen
      ) {
        return <RSVPClosedPlaceholder />;
      }
      return <HackerPortal />;
    } else if (user.role === HibiscusRole.SPONSOR)
      return <SponsorPortal user={user} />;
    else if (user.role === HibiscusRole.VOLUNTEER) return <IdentityPortal />;
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
  height: 100%;
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
  const ffr = container.resolve(FeatureFlagRepository);
  const configs = (await ffr.getAll()) ?? {
    APPS_OPEN: false,
    RSVP_FORM_OPEN: false,
  };
  const appsOpen = configs['APPS_OPEN'];
  const rsvpFormOpen = configs['RSVP_FORM_OPEN'];
  return {
    props: {
      appsOpen: true,
      rsvpFormOpen,
    } as ServerSideProps,
  };
};
