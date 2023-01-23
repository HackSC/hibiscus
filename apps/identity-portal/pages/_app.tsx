import { GlobalStyles2023 } from '@hibiscus/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import styled from 'styled-components';
import { useHibiscusUser, PortalLayout } from '@hibiscus/ui-portal';
import { useRouter } from 'next/router';
import { getWebTitle } from '@hibiscus/metadata';
import { Toaster } from 'react-hot-toast';
import { menuWrapper } from '@hibiscus/ui-portal';

function CustomApp({ Component, pageProps }: AppProps) {
  const { user } = useHibiscusUser();
  const router = useRouter();

  const createWebTitle = () => {
    switch (router.asPath) {
      case '/':
        return getWebTitle('Home');
      case '/apply-2023':
        return getWebTitle('Apply');
      case '/team':
        return getWebTitle('Your team');
      default:
        return getWebTitle('Home');
    }
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <title>{createWebTitle()}</title>
      </Head>
      <Main>
        <Toaster />
        <GlobalStyles2023 />
        <PortalLayout user={user}>
          <Component {...pageProps} />
        </PortalLayout>
      </Main>
    </>
  );
}

export default menuWrapper.withRedux(CustomApp);

const Main = styled.main`
  position: absolute;
  width: 100%;
  height: 100%;
`;
