import styled from 'styled-components';
import LoginCard from '../../components/login-card/login-card';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoginGuard } from '../../components/login-guard';
import { getWebTitle } from '@hibiscus/metadata';

export function Index() {
  const [callback, setCallback] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (router.query.callback != null) {
      sessionStorage.setItem('callback', router.query.callback.toString());
      setCallback(router.query.callback.toString());
    } else {
      setCallback(sessionStorage.getItem('callback') ?? '');
    }
  }, [router.isReady, router.query]);

  return (
    <MainPageWrapper>
      <Head>
        <title>{getWebTitle('Login')}</title>
      </Head>
      <LoginGuard callback={callback}>
        <LoginCard />
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
`;
