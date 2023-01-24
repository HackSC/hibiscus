import 'reflect-metadata';
import { AppProps } from 'next/app';
import './styles.css';
import Head from 'next/head';
import { GlobalStyles2023 } from '@hibiscus/styles';
import { SupabaseContextProvider } from '@hibiscus/hibiscus-supabase-client';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <main className="app">
        <GlobalStyles2023 />
        <SupabaseContextProvider>
          <Component {...pageProps} />
        </SupabaseContextProvider>
      </main>
    </>
  );
}

export default CustomApp;
