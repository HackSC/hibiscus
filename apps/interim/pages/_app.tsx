import { GlobalStyles } from '@hacksc-platforms/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HackSC | Join us next year!</title>
      </Head>
      <main className="app">
        <GlobalStyles />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
