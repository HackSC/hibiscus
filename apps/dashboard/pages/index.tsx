import { useState } from 'react';
import { H1, H4 } from '@hacksc-platforms/ui';
import styled from 'styled-components';
import GrayContentBox from '../components/gray-content-box/gray-content-box';
import { Search } from '@hacksc-platforms/ui-kit-2023';
import TopBar from '../components/top-bar/top-bar';
import { HibiscusRole } from '@hacksc-platforms/types';

export function Index() {
  const [user] = useState<{
    tag: string;
    role: HibiscusRole;
    firstName: string;
  }>({
    tag: '@vincentvu',
    role: HibiscusRole.ADMIN,
    firstName: 'Vincent',
  });

  return (
    <MainPageWrapper>
      <TopBar userTag={user.tag} role={user.role} />
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
                color: '#FFA295',
                fontSize: '30px',
                textShadow: '0px 0px 10px rgba(254, 81, 57, 0.5)',
              }}
            >
              Welcome, {user.firstName}
            </H1>
            <H4 style={{ color: '#989898' }}>
              What would you like to do today?
            </H4>
          </div>
          <Search
            placeholder={'Search...'}
            onInput={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
          ></Search>
        </div>
        <div>
          <p style={{ margin: '13px 0' }}>Quick Actions</p>
          <QuickActionContainer>
            <GrayContentBox location="/redstar.svg"></GrayContentBox>
            <GrayContentBox location="/pinkstar.svg"></GrayContentBox>
            <GrayContentBox location="/greenstar.svg"></GrayContentBox>
            <GrayContentBox location="/purplepin.svg"></GrayContentBox>
            <GrayContentBox location="/yellowpin.svg"></GrayContentBox>
          </QuickActionContainer>
        </div>

        <AddOnAndStats>
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
        </AddOnAndStats>
      </LayoutContainer>
    </MainPageWrapper>
  );
}

export default Index;
const AddOnOuter = styled.div`
  width: 41%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const AddOn = styled.div`
  width: 94%;
  height: 90%;
  background: #363636;
  /* smaller-red-glow */
  border: 2px solid #5a5a5a;
  border-radius: 10px;
  /* box-shadow: 0px 0px 10px rgba(254, 81, 57, 0.5); */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Stats = styled.div`
  width: 100%;
  height: 90%;
  background: #363636;
  border: 2px solid #5a5a5a;
  /* smaller-red-glow */

  /* box-shadow: 0px 0px 10px rgba(254, 81, 57, 0.5); */
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StatsOuter = styled.div`
  width: 59%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const AddOnAndStats = styled.div`
  display: inline-flex;
  width: 100%;
  height: 300px;
`;
const QuickActionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;

const LayoutContainer = styled.div`
  width: 72%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;
