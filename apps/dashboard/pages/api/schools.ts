import { NextApiHandler } from 'next';
import { SCHOOL_LINES } from '../../common/schools';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');
  const schools = SCHOOL_LINES.split('\n');
  res.status(200).json(schools);
};

export default handler;
