import styled from 'styled-components';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import { HibiscusRole } from '@hibiscus/types';
import HackerPortal from '../components/hacker-portal/hacker-portal';

export function Index() {
  const { user } = useHibiscusUser();

  if (user == null) {
    return <>Loading</>;
  }

  const Dashboard = () => {
    if (user.role === HibiscusRole.HACKER) return <HackerPortal />;
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
