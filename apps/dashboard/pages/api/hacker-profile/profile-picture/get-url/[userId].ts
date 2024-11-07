import 'reflect-metadata';
import { HackFromProfilePictureClient } from '@hibiscus/hackform-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';
import {
  rateLimitHandler,
} from '../../../../../common/utils';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';

const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.query;
  const userIdString = userId as string;

  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  try {
    await rateLimitHandler(req, res);
  } catch (e) {
    return res.status(429).send('Too many requests');
  }

  const pfpClient = container.resolve(HackFromProfilePictureClient);

  const checkExist = await pfpClient.pfpExists(userIdString);

  const url = await pfpClient.getPfpUrl(userIdString);

  return res.status(200).json({ exist: pfpClient, url });
};

export default handler;