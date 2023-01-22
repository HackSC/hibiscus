import { BattlePassRepository } from '../../../repository/battlepass.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { getEnv } from '@hibiscus/env';

/**
 * getLeaderboard - get the entire leaderboard
 * @param req - no request param
 * @param res - returns the sorted list repersenting the leaderbord
 * @return 200 for ok 401 for wrong type of method 500 for internal server error
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(401).send({ message: 'Method not supported' });
  }

  try {
    const repo = container.resolve(BattlePassRepository);

    //Gets invited_id and team_id. Also check if invite exists by checking length of getInvite.
    const result = await repo.getLeaderboard();
    if (result.data.length === 0) {
      throw new Error('Failed to get leaderboard data');
    }

    return res.status(200).json(result.data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
