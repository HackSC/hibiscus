import 'reflect-metadata';
import { AppProps } from 'next/app';
import './styles.css';
import Head from 'next/head';
import { GlobalStyles2023 } from '@hibiscus/styles';
import { SupabaseContextProvider } from '@hibiscus/hibiscus-supabase-context';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';

function handleSignInWithGoogle(response) {
  console.log('HEREREREREER');
}

function CustomApp({ Component, pageProps }: AppProps) {
  const { supabase } = useHibiscusSupabase();

  // async function handleSignInWithGoogle(response) {
  //   console.log('HEREREREREER');
  //   const { data, error } = await supabase.getClient().auth.signInWithIdToken({
  //     provider: 'google',
  //     token: response.credential,
  //   });
  // }
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <script src="https://accounts.google.com/gsi/client" async />
      </Head>
      <main className="app">
        <GlobalStyles2023 />
        <SupabaseContextProvider>
          <Component {...pageProps} />
        </SupabaseContextProvider>
      </main>
    </>
  );
}

export default CustomApp;
