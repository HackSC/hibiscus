import styled from 'styled-components';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import { HibiscusRole } from '@hibiscus/types';
import HackerPortal from '../components/hacker-portal/hacker-portal';
import SponsorPortal from '../components/sponsor-portal/sponsor-portal';
import { GetServerSideProps } from 'next';
import { get } from '@vercel/edge-config';
import AppsClosedPlaceholder from '../components/hacker-portal/apps-closed-placeholder';
import { isHackerPostAppStatus } from '../common/utils';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux/hooks';
import { removeTabRoute } from '../store/menu-slice';

interface ServerSideProps {
  appsOpen: boolean;
}

export function Index({ appsOpen }: ServerSideProps) {
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
      }
      return <HackerPortal />;
    } else if (user.role === HibiscusRole.SPONSOR)
      return <SponsorPortal user={user} />;
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const appsOpen = await get('appsOpen');
  return {
    props: {
      appsOpen,
    } as ServerSideProps,
  };
};
