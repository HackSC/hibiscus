import { NextApiHandler } from 'next';
import { SCHOOLS } from '../../common/schools';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');
  res.status(200).json(SCHOOLS);
};

export default handler;
