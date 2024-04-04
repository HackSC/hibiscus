import { AppProps } from 'next/app';
import Head from 'next/head';
import { ProjectContextProvider } from '../ProjectContext';
import { SupabaseContextProvider } from '@hibiscus/hibiscus-supabase-context';
import { HibiscusUserProvider } from '@hibiscus/hibiscus-user-context';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HackSC Podium</title>
      </Head>
      <SupabaseContextProvider>
        <HibiscusUserProvider>
          <ProjectContextProvider>
            <main>
              <Component {...pageProps} />
            </main>
          </ProjectContextProvider>
        </HibiscusUserProvider>
      </SupabaseContextProvider>
    </>
  );
}

export default App;
