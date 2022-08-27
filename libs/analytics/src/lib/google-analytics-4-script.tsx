import Script from 'next/script';
import { useId } from 'react';

/* eslint-disable-next-line */
export interface AnalyticsProps {
  measuringId: string;
}

/**
 * A component to easily enable GA4 on a Next.js website given its `measuringId`; requires a GA4 property to be created
 */
export function GoogleAnalytics4Script({ measuringId }: AnalyticsProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${measuringId}`}
      />
      <Script strategy="lazyOnload" id={useId()}>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measuringId}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
    </>
  );
}

export default GoogleAnalytics4Script;
