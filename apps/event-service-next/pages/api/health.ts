import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  status: 'ALIVE';
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ status: 'ALIVE' });
}
