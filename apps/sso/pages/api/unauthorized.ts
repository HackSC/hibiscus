import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  res.status(401).json({ message: 'Unauthorized' });
};

export default handler;
