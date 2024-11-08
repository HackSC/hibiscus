import 'reflect-metadata';
import { HackformResumeUploadClient } from '@hibiscus/hackform-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';
import {
  rateLimitHandler,
} from '../../../../../common/utils';

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

  const resumeClient = container.resolve(HackformResumeUploadClient);

  const checkExist = await resumeClient.resumeExists(userIdString);

  const url = await resumeClient.getResumeUrl(userIdString);

  return res.status(200).json({ exist: checkExist, url });
};

export default handler;