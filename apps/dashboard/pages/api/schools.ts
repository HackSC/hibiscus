import { NextApiHandler } from 'next';
import { schools } from '../../common/schools';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');
  res.status(200).json(schools);
};

export default handler;
