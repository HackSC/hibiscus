import { BattlePassRepository } from '../../../repository/battlepass.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(401).send({ message: 'Method not supported' });
  }

  try {
    const repo = container.resolve(BattlePassRepository);

    const body = req.body;

    // TODO: handle error??
    await repo.setBonusPointPending(body.userId, body.bonusPointId);

    return res.status(200).json({ message: 'Success' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
