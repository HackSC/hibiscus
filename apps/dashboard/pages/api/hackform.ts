import 'reflect-metadata';
import { HackformSubmissionDataClient } from '@hibiscus/hackform-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';
import { HackformSubmission } from '@hibiscus/types';

const handler: NextApiHandler = async (req, res) => {
  const client = container.resolve(HackformSubmissionDataClient);
  if (req.method === 'POST') {
    const submission = req.body.submission as HackformSubmission;
    // submits to hackform data store and get hackform id
    const data = await client.submitForm(submission);
    return res.status(200).json(data);
  } else if (req.method === 'GET') {
    const id = req.query.id as string;
    const data = await client.getHackformSubmission(id);
    return res.status(200).json(data);
  } else {
    return res.status(405).send('Method not allowed');
  }
};

export default handler;
