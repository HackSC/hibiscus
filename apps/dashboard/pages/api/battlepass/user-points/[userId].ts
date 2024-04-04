import { BattlePassRepository } from '../../../../repository/battlepass.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(401).send({ message: 'Method not supported' });
  }

  try {
    const repo = container.resolve(BattlePassRepository);

    const userId = req.query.userId.toString();

    // TODO: handle error??
    const data = await repo.getTotalPoints(userId);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
