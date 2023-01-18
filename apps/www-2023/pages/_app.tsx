import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyles2023 } from '@hibiscus/styles';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <title>HackSC 2023 | Around the World</title>
      </Head>
      <main className="app">
        <GlobalStyles2023 />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
