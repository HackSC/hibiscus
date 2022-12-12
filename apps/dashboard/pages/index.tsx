import { useState } from 'react';
import { H1, H4 } from '@hacksc-platforms/ui';
import { Colors2023 } from '@hacksc-platforms/styles';
import styled from 'styled-components';
import SidebarNav from '../components/navbar/navbar';
import GrayContentBox from '../components/gray-content-box/gray-content-box';

export function Index() {
  const [userFirstName] = useState('Vincent');

  return (
    <MainPageWrapper>
      <h1 id="titleText">HackSC</h1>
      <div id="mainDiv">
        <SidebarNav />
        <LayoutContainer>
          <div>
            <H1>
              Welcome,{' '}
              <span style={{ color: Colors2023.BLUE_STANDARD }}>
                {userFirstName}
              </span>
            </H1>
            <H4>What would you like to do today?</H4>
          </div>
          <div>
            <GrayContentBox title={'Quick actions'}>
              <p>hello</p>
            </GrayContentBox>
            <GrayContentBox>
              <p>hello</p>
            </GrayContentBox>
          </div>
        </LayoutContainer>
      </div>
    </MainPageWrapper>
  );
}

export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width: 100%;
  margin-left: 5rem;
`;
