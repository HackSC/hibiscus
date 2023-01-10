import { GlobalStyles2023 } from '@hibiscus/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { wrapper } from '../store/store';
import styled from 'styled-components';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import PortalLayout from '../layouts/portal-layout';

function CustomApp({ Component, pageProps }: AppProps) {
  const { user } = useHibiscusUser();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <title>Home | Hibiscus</title>
      </Head>
      <Main>
        <GlobalStyles2023 />
        <PortalLayout user={user}>
          <Component {...pageProps} />
        </PortalLayout>
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
