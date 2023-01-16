import { H1, H3 } from '@hibiscus/ui';
import styled from 'styled-components';
import GrayContentBox from '../components/gray-content-box/gray-content-box';
import { Search } from '@hibiscus/ui-kit-2023';
import Image from 'next/image';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import { getColorsForRole } from '../common/role.utils';
import { HibiscusRole } from '@hibiscus/types';
import { Link } from '@hibiscus/ui';
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
          <div>
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
          </div>

          {/* <Search
              placeholder={'Search...'}
              onInput={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            ></Search> */}
        </div>

        {renderDashboard()}

        {/* <div> */}
        {/* <p style={{ margin: '13px 0' }}>Quick Actions</p> */}
        {/* <QuickActionContainer> */}
        {/* <GrayContentBox location="/redstar.svg"></GrayContentBox> */}
        {/* <GrayContentBox location="/pinkstar.svg"></GrayContentBox> */}
        {/* <GrayContentBox location="/greenstar.svg"></GrayContentBox>
              <GrayContentBox location="/purplepin.svg"></GrayContentBox>
              <GrayContentBox location="/yellowpin.svg"></GrayContentBox> */}
        {/* </QuickActionContainer> */}
        {/* </div> */}
        {/* <AddOnAndStats>
            <AddOnOuter>
              <p style={{ textAlign: 'left', width: '90%', margin: '10px 0' }}>
                Add-Ons
              </p>
              <AddOn></AddOn>
            </AddOnOuter>
            <StatsOuter>
              <p style={{ textAlign: 'left', width: '90%', margin: '10px 0' }}>
                Stats
              </p>
              <Stats></Stats>
            </StatsOuter>
          </AddOnAndStats> */}
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

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-top: 100px;
`;

const ApplyButton = styled.button`
  cursor: pointer;
  background-color: #979797;
  color: #f4f4f4;
  font-weight: 500;
  padding: 8px;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;

  &:hover {
    background-color: #6f9a28;
    color: #e9ffc5;
    transition: all 0.3s;
  }
`;
