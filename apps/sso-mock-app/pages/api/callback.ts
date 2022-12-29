import { NextApiHandler } from 'next';
import { callbackApiHandler } from '@hibiscus/sso-client';

const handler: NextApiHandler = callbackApiHandler(
  process.env.SSO_MOCK_APP_URL
);

export default handler;
