import { GoogleAnalytics4Script } from '@hacksc-platforms/analytics';
import { GlobalStyles } from '@hacksc-platforms/styles';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

export interface CustomAppProps extends AppProps {
  envs: {
    googleAnalyticsMeasuringId: string;
  };
}

function CustomApp({ Component, pageProps, envs }: CustomAppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <>
        <Head>
          <title>HackSC | Join our team!</title>
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
  );
}

CustomApp.getInitialProps = async (
  ctx: AppContext
): Promise<Partial<CustomAppProps>> => {
  const appProps = await App.getInitialProps(ctx);
  return {
    ...appProps,
    envs: {
      googleAnalyticsMeasuringId: process.env.GA_MEASURING_ID,
    },
  };
};

export default CustomApp;
