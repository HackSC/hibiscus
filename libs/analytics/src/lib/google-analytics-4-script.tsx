import Script from 'next/script';
import { useId } from 'react';

/* eslint-disable-next-line */
export interface AnalyticsProps {
  streamingId: string;
}

/**
 * A component to easily enable GA4 on a Next.js website given its `streamingId`; requires a GA4 property to be created
 */
export function GoogleAnalytics4Script({ streamingId }: AnalyticsProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${streamingId}`}
      />
      <Script strategy="lazyOnload" id={useId()}>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${streamingId}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
    </>
  );
}

export default GoogleAnalytics4Script;
