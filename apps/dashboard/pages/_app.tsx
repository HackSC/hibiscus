import { GlobalStyles2023 } from '@hibiscus/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import '../components/events/event-list.global.css';
import { wrapper } from '../store/store';
import styled from 'styled-components';
import { HibiscusUserProvider } from '../hooks/use-hibiscus-user/use-hibiscus-user';
import PortalLayout from '../layouts/portal-layout';
import { useRouter } from 'next/router';
import { getWebTitle } from '@hibiscus/metadata';
import { Toaster } from 'react-hot-toast';
import { TeamProvider } from '../hooks/use-team/use-team';
import { SupabaseContextProvider } from '@hibiscus/hibiscus-supabase-context';
import Router from 'next/router';
import nProgress from 'nprogress';
import ThemelessLayout from '../layouts/themeless-layout';
import { GlobalStyle } from '@hacksc/sctw-ui-kit';

Router.events.on('routeChangeStart', (url) => {
  nProgress.start();
});
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

const newLayoutRoutes = ['/events', '/sponsor-booth', '/participant-database'];

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
        <GlobalStyle />
        <SupabaseContextProvider>
          <TeamProvider>
            <HibiscusUserProvider>
              {newLayoutRoutes.includes(router?.pathname) ? (
                <ThemelessLayout>
                  <Component {...pageProps} />
                </ThemelessLayout>
              ) : (
                <PortalLayout>
                  <Component {...pageProps} />
                </PortalLayout>
              )}
            </HibiscusUserProvider>
          </TeamProvider>
        </SupabaseContextProvider>
      </Main>
    </>
  );
}

export default wrapper.withRedux(CustomApp);

const Main = styled.main`
  position: absolute;
`;
