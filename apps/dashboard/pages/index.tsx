import styled from 'styled-components';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import { HibiscusRole } from '@hibiscus/types';
import HackerPortal from '../components/hacker-portal/hacker-portal';
import SponsorPortal from '../components/sponsor-portal/sponsor-portal';

export function Index() {
  const { user } = useHibiscusUser();

  if (user == null) {
    return <>Loading</>;
  }

  const renderDashboard = () => {
    if (user.role === HibiscusRole.HACKER) return <HackerPortal user={user} />;
    if (user.role === HibiscusRole.SPONSOR)
      return <SponsorPortal user={user} />;
  };

  return (
    <Wrapper>
      <LayoutContainer>{renderDashboard()}</LayoutContainer>
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
