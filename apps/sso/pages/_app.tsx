import 'reflect-metadata';
import { AppProps } from 'next/app';
import './styles.css';
import Head from 'next/head';
import { GlobalStylesSCTW } from '@hibiscus/styles';
import { SupabaseContextProvider } from '@hibiscus/hibiscus-supabase-context';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <main className="app">
        <GlobalStylesSCTW />
        <SupabaseContextProvider>
          <Component {...pageProps} />
        </SupabaseContextProvider>
      </main>
    </>
  );
}

export default CustomApp;
