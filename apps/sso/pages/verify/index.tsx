import styled from 'styled-components';
import { TrademarkColors } from '@hibiscus/styles';
import VerifyCard from '../../components/verify-card/verify-card';
import Head from 'next/head';

export function Index() {
  return (
    <MainPageWrapper>
      <Head>
        <title>Verify your email | Hibiscus</title>
      </Head>
      <VerifyCard />
    </MainPageWrapper>
  );
}
export default Index;

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(
    45deg,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 33%,
    ${TrademarkColors.LIGHT_RED} 66%,
    ${TrademarkColors.YELLOW} 100%
  );
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;
