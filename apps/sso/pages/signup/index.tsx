import styled from 'styled-components';
import SignUpCard from '../../components/signup-card/signup-card';
import Head from 'next/head';
import { getWebTitle } from '@hibiscus/metadata';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function Index() {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (router.query.callback != null) {
      sessionStorage.setItem('callback', router.query.callback.toString());
    }
  }, [router.isReady, router.query]);

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
`;
