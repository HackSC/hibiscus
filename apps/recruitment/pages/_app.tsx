import { GlobalStyles } from '@hacksc-platforms/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to recruitment!</title>
      </Head>
      <main className="app">
        <GlobalStyles />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
