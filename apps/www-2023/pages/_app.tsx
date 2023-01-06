import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyles2023 } from '@hibiscus/styles';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to landing-page!</title>
      </Head>
      <main className="app">
        <GlobalStyles2023 />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
