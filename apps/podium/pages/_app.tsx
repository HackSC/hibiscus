import './styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ProjectContextProvider } from '../ProjectContext';
import { SupabaseContextProvider } from '@hibiscus/hibiscus-supabase-context';
import { HibiscusUserProvider } from '@hibiscus/hibiscus-user-context';
import { ThemelessLayout } from 'libs/hibiscus-layout/src';
import styled from 'styled-components';
import { GlobalStyles2024 } from '@hibiscus/styles';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HackSC Podium</title>
      </Head>
      <Main>
        <GlobalStyles2024 />
        <SupabaseContextProvider>
          <HibiscusUserProvider>
            <ProjectContextProvider>
              <ThemelessLayout>
                <Component {...pageProps} />
              </ThemelessLayout>
            </ProjectContextProvider>
          </HibiscusUserProvider>
        </SupabaseContextProvider>
      </Main>
    </>
  );
}

export default App;

const Main = styled.main`
  position: absolute;
  width: 100%;
`;
