import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  if (req.method !== 'GET') {
    return res.status(403).send('Method not allowed');
  }
};

export default handler;
