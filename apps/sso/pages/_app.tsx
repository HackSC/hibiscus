import 'reflect-metadata';
import { AppProps } from 'next/app';
import { RouteGuard } from '../components/routeGuard';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hibiscus by HackSC</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
