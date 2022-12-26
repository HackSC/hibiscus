import TopBar from '../../components/top-bar/top-bar';
import styled from 'styled-components';
import Hackerform from '../../components/hackerform/hackform';
import { HibiscusRole } from '@hacksc-platforms/types';
import { formMetadata2023HackerApps } from '../../common/hackform.metadata';

export function Index() {
  return (
    <MainPageWrapper>
      <TopBar userTag={'@vincentvu'} role={HibiscusRole.HACKER} />
      <Hackerform formMetadata={formMetadata2023HackerApps} />
    </MainPageWrapper>
  );
}

export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;
