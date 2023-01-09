import { GlobalStyles2023 } from '@hibiscus/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { wrapper } from '../store/store';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Toaster } from 'react-hot-toast';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // without this, going to another page will still keep the progress bar as it was before
  useEffect(() => {
    NProgress.remove();
  }, [router.asPath]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <title>Home | Hibiscus</title>
      </Head>
      <Main>
        <Toaster />
        <GlobalStyles2023 />
        <Component {...pageProps} />
      </Main>
    </>
  );
}

export default wrapper.withRedux(CustomApp);

const Main = styled.main`
  position: absolute;
  width: 100%;
  height: 100%;
`;
