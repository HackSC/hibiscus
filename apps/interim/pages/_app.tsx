import { GlobalFontFaces } from '@hacksc-platforms/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalFontFaces />
      <Head>
        <title>HackSC | Join us next year!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
