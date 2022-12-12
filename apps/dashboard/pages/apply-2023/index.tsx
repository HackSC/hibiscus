import styled from 'styled-components';
import SidebarNav from '../../components/navbar/navbar';
import Link from 'next/link';
import Hackerform from '../../components/hackerform/hackerform';

export function Index() {
  return (
    <MainPageWrapper>
      <h1 id="titleText">
        <Link passHref href="../">
          HackSC
        </Link>
      </h1>
      <div id="mainDiv">
        <SidebarNav />
        <Hackerform />
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
