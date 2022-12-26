import styled from 'styled-components';
import LoginCard from '../../components/login-card/login-card';
import { TrademarkColors } from '@hacksc-platforms/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoginGuard } from '../../components/login-guard';

export function Index() {
  const router = useRouter();
  const [callback, setCallback] = useState(null);
  useEffect(() => {
    if (!router.isReady) return;

    setCallback(router.query.callback?.toString() ?? '/');
  }, [router.isReady, router.query]);

  return (
    <MainPageWrapper>
      <Head>
        <title>Login | Hibiscus by HackSC</title>
      </Head>
      <LoginGuard callback={callback}>
        <LoginCard callback={callback} />
      </LoginGuard>
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
