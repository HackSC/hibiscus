import { HackformSubmissionDataClient } from '@hibiscus/hackform-client';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { app_id } = req.body;
    if (app_id == null) {
      res.status(400).json({ message: 'Missing app_id in request body' });
    } else {
      const hackformClient = new HackformSubmissionDataClient();
      const data = await hackformClient.getHackformSubmission(app_id);

      res.status(200).json({ data });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
