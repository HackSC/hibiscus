import { BattlePassRepository } from '../../../repository/battlepass.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { getEnv } from '@hibiscus/env';

/**
 * getPosition - returns the place fo the user on the leaderboard
 * @param req - userid : string/uuid
 * @param res - the int repersenting the place
 * @return 200 if success 401 for wrong type of request 500 for server error
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
    const leaderboard = await repo.getLeaderboard();
    const leaderboard_data = leaderboard.data;

    leaderboard_data.sort();

    let place = 0;

    leaderboard_data.every((element) => {
      if (element.user_id === req.query.user_id) {
        return place;
      } else {
        place++;
      }
    });

    return res.status(200).json({ place: place });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
