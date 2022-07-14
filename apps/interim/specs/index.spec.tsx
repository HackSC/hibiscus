import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SendgridClient } from '../common/sendgrid.client';
import SendgridClientContext from '../contexts/SendgridClientProvider';

import Index from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={new QueryClient()}>
        <SendgridClientContext.Provider value={new SendgridClient('')}>
          <Index />
        </SendgridClientContext.Provider>
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
