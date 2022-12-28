import { GlobalStyles2023 } from '@hibiscus/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { store } from '../store/store';
import { Provider } from 'react-redux';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <link rel="shortcut icon" href="/img/favicon.ico" />
          <title>Home | Hibiscus</title>
        </Head>
        <main className="app">
          <GlobalStyles2023 />
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}

export default CustomApp;
