import { NextApiRequest, NextApiResponse } from 'next';

const handleOptionsRequest = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).send('ok');
};

export default handleOptionsRequest;
