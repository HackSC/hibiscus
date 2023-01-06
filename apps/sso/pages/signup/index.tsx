import styled from 'styled-components';
import SignUpCard from '../../components/signup-card/signup-card';
import { TrademarkColors } from '@hibiscus/styles';
import Head from 'next/head';
import { getWebTitle } from '@hibiscus/metadata';

export function Index() {
  return (
    <MainPageWrapper>
      <Head>
        <title>{getWebTitle('Sign up')}</title>
      </Head>
      <SignUpCard />
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
