import { AppProps } from 'next/app';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HackSC Podium Service</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
