import { GlobalStyles } from '@hacksc-platforms/styles';
import { GetServerSideProps } from 'next';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SendgridClient } from '../common/sendgrid.client';
import SendgridClientContext from '../contexts/SendgridClientProvider';

export interface CustomAppProps extends AppProps {
  envs: {
    sendgridApiKey: string;
  };
}

function CustomApp({ Component, pageProps, envs }: CustomAppProps) {
  const queryClient = new QueryClient();
  const sendgridClient = new SendgridClient(envs.sendgridApiKey);

  return (
    <SendgridClientContext.Provider value={sendgridClient}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <>
          <Head>
            <title>HackSC | Join us next year!</title>
          </Head>
          <main className="app">
            <GlobalStyles />
            <Component {...pageProps} />
          </main>
        </>
      </QueryClientProvider>
    </SendgridClientContext.Provider>
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
