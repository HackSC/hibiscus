import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'OPTIONS':
      return res.status(200).send('ok');
    case 'POST':
      return res.status(501).json({ error: 'Not implemented' });
    default:
      res.status(405).end();
      break;
  }
}
