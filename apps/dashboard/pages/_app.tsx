import { GlobalStyles2023 } from '@hacksc-platforms/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <title>Home | Hibiscus</title>
      </Head>
      <main className="app">
        <GlobalStyles2023 />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
