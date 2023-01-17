import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { DashboardRepository } from '../../repository/dashboard.repository';

const repo = container.resolve(DashboardRepository);
export default async function getTeamMembers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const teamId = req.query.teamId as string;
    if (!teamId) {
      throw new Error('Team ID is missing or null.');
    }

    //query for all team members
    const result = await repo.getTeamInfo(teamId);
    if (result.error) {
      throw new Error('Team with given id does not exist.' + result.error);
    }
    return res.status(200).json(result.data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
