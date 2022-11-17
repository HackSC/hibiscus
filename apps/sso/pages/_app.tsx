import { AppProps } from 'next/app';
import { RouteGuard } from '../components/RouteGuard';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to sso!</title>
      </Head>
      <main className="app">
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </main>
    </>
  );
}

export default CustomApp;
