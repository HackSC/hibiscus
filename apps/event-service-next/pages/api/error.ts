import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { message, status } = req.query;
  res.status(parseInt(status as string)).json({ message: message as string });
}
