import { NextApiHandler } from 'next';
import { callbackApiHandler } from '@hibiscus/sso-client';
import { getEnv } from '@hibiscus/env';

const handler: NextApiHandler = callbackApiHandler(
  getEnv().Hibiscus.AppURL.portal
);

export default handler;
