import { H1, H3 } from '@hibiscus/ui';
import styled from 'styled-components';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import { getColorsForRole } from '../common/role.utils';
import { HibiscusRole } from '@hibiscus/types';
import HackerPortal from '../components/hacker-portal/hacker-portal';

export function Index() {
  const { user } = useHibiscusUser();

  if (user == null) {
    return <>Loading</>;
  }

  const userColors = getColorsForRole(user?.role ?? HibiscusRole.HACKER);

  const renderDashboard = () => {
    if (user.role === HibiscusRole.HACKER) return <HackerPortal user={user} />;
  };

  return (
    <Wrapper>
      <LayoutContainer>
        <div
          style={{
            display: 'inline-flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <WelcomeContainer>
            <H1
              style={{
                color: userColors.light,
                fontSize: '30px',
                textShadow: `0px 0px 10px ${userColors.standard}`,
              }}
            >
              Welcome, {user.firstName}
            </H1>
            <H3 style={{ color: '#989898' }}>
              What would you like to do today?
            </H3>
          </WelcomeContainer>
        </div>

        {renderDashboard()}
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

// const AddOnOuter = styled.div`
//   width: 41%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const AddOn = styled.div`
//   width: 94%;
//   height: 90%;
//   background: #363636;
//   /* smaller-red-glow */
//   border: 2px solid #5a5a5a;
//   border-radius: 10px;
//   /* box-shadow: 0px 0px 10px rgba(254, 81, 57, 0.5); */
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Stats = styled.div`
//   width: 100%;
//   height: 90%;
//   background: #363636;
//   border: 2px solid #5a5a5a;
//   /* smaller-red-glow */
//   /* box-shadow: 0px 0px 10px rgba(254, 81, 57, 0.5); */
//   border-radius: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StatsOuter = styled.div`
//   width: 59%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const AddOnAndStats = styled.div`
//   display: inline-flex;
//   width: 100%;
//   height: 300px;
// `;

const QuickActionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 30px;
`;

const WelcomeContainer = styled.div`
  @media (max-width: 400px) {
    margin-top: 5rem;
  }
`;
