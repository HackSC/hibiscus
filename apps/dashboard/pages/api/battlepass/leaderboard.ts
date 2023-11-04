import { BattlePassRepository } from 'apps/dashboard/repository/battlepass.repository';
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

    const pageNumber = parseInt(req.query.pageNumber?.toString() ?? '');
    const pageSize = parseInt(req.query.pageSize?.toString() ?? '');
    if (
      isNaN(pageNumber) ||
      isNaN(pageSize) ||
      pageNumber < 1 ||
      pageSize < 1
    ) {
      return res.status(404).send({
        message: 'Please provide valid pageNumber and pageSize.',
      });
    }

    // TODO: handle error??
    const { data } = await repo.getLeaderboard(pageNumber, pageSize);

    const leaderboard = data ?? [];

    const returnData = {
      data: {
        page_number: pageNumber,
        page_count: pageSize,
        leaderboard: leaderboard.map((item) => {
          const userProfile = item.user_profiles as any;
          return {
            bonus_points: item.bonus_points,
            event_points: item.event_points,
            total_points: item.total_points,
            first_name: userProfile.first_name,
            last_name: userProfile.last_name,
          };
        }),
      },
    };

    return res.status(200).json(returnData);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
