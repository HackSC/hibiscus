import { GlobalStyles } from '@hacksc-platforms/styles';
import { GetServerSideProps } from 'next';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
export interface CustomAppProps extends AppProps {
  envs: {
    sendgridApiKey: string;
  };
}

function CustomApp({ Component, pageProps, envs }: CustomAppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <>
        <Head>
          <title>HackSC | Join us next year!</title>
          <link rel="shortcut icon" href="/img/favicon.ico" />
        </Head>
        <main className="app">
          <GlobalStyles />
          <Component {...pageProps} />
        </main>
      </>
    </QueryClientProvider>
  );
}

CustomApp.getInitialProps = async (
  ctx: AppContext
): Promise<Partial<CustomAppProps>> => {
  const appProps = await App.getInitialProps(ctx);
  return {
    ...appProps,
    envs: { sendgridApiKey: process.env.SENDGRID_API_KEY },
  };
};

export default CustomApp;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      sendGridAPIKey: process.env.SENDGRID_API_KEY,
    },
  };
};
