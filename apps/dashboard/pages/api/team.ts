import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { DashboardRepository } from '../../repository/dashboard.repository';

const repo = container.resolve(DashboardRepository);
const supabase = repo.getClient();

export default async function getTeamMembers(req, res) {
  try {
    let teamId = req.body.team_id;
    if (!teamId) {
      throw new Error('Team ID is missing or null.');
    }

    //query for all team members
    let result = await repo.getAllTeamMembers(teamId);
    if (result.data.length === 0) {
      throw new Error('Team with given id does not exist.');
    }
    return res.status(200).json(result.data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
