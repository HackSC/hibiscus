import styled from 'styled-components';
import Navbar from '../components/navbar/navbar';

// const StyledPage = styled.div`
//   .page {
//   }
// `;

export function Index() {
  return (
    <MainPageWrapper>
      <h1 id="titleText">HackSC</h1>
      <div id="mainDiv">
        <Navbar />
        <div id="welcomeDiv">
          <h1>Welcome $(name)</h1>
        </div>
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
  background: white;
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;
