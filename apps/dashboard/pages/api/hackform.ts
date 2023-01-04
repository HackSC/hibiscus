import 'reflect-metadata';
import { HackformSubmissionDataClient } from '@hibiscus/hackform-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
  const client = container.resolve(HackformSubmissionDataClient);
  if (req.method === 'POST') {
    const submission = req.body.submission;
    const data = await client.submitForm(submission);
    return res.status(200).json(data);
  } else if (req.method === 'GET') {
    const id = req.query.id as string;
    const data = await client.getHackformSubmission(id);
    return res.status(200).json(data);
  }
};

export default handler;
