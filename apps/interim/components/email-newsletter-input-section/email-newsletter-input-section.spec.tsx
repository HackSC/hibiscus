import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import SendgridClientContext from '../../contexts/SendgridClientProvider';

import { SendgridClient } from '../../common/sendgrid.client';
import EmailNewsletterInputSection from './email-newsletter-input-section';

describe('EmailNewsletterInputSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <SendgridClientContext.Provider value={new SendgridClient('')}>
          <EmailNewsletterInputSection />
        </SendgridClientContext.Provider>
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
