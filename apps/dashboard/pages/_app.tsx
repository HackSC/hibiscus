import { GlobalStyles2023 } from '@hibiscus/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { wrapper } from '../store/store';

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

export default wrapper.withRedux(CustomApp);
