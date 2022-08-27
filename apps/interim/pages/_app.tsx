import { GlobalStyles } from '@hacksc-platforms/styles';
import { GoogleAnalytics4Script } from '@hacksc-platforms/analytics';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SendgridClient } from '../common/sendgrid.client';
import SendgridClientContext from '../contexts/SendgridClientProvider';

export interface CustomAppProps extends AppProps {
  envs: {
    sendgridApiKey: string;
    googleAnalyticsMeasuringId: string;
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
            <link rel="shortcut icon" href="/img/favicon.ico" />
          </Head>
          <main className="app">
            <GoogleAnalytics4Script
              measuringId={envs.googleAnalyticsMeasuringId}
            />
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
    envs: {
      sendgridApiKey: process.env.SENDGRID_API_KEY,
      googleAnalyticsMeasuringId: process.env.GA_MEASURING_ID,
    },
  };
};

export default CustomApp;
