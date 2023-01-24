import { GlobalStyles2023 } from '@hibiscus/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { wrapper } from '../store/store';
import styled from 'styled-components';
import PortalLayout from '../layouts/portal-layout';
import { useRouter } from 'next/router';
import { getWebTitle } from '@hibiscus/metadata';
import { Toaster } from 'react-hot-toast';
import { TeamProvider } from '../hooks/use-team/use-team';
import { SupabaseContextProvider } from '@hibiscus/hibiscus-supabase-client';

function CustomApp({ Component, pageProps }: AppProps) {
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
        <SupabaseContextProvider>
          <TeamProvider>
            <PortalLayout>
              <Component {...pageProps} />
            </PortalLayout>
          </TeamProvider>
        </SupabaseContextProvider>
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
