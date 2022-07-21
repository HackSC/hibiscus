import React from 'react';
import { SendgridClient } from '../../common/sendgrid.client';
import SendgridClientContext from '../../contexts/SendgridClientProvider';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseSendgridClient {
  sendgridClient: SendgridClient;
}

export function useSendgridClient(): UseSendgridClient {
  const client = React.useContext(SendgridClientContext);
  return { sendgridClient: client };
}

export default useSendgridClient;
