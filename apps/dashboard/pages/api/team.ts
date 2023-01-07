import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { DashboardRepository } from 'apps/dashboard/repository/DashboardRepository';

const repo = container.resolve(DashboardRepository);
const supabase = repo.getClient();

export default async function getTeamMembers(req, res) {
  let teamId = req.body.team_id;

  //query for all team members
  const { data, error } = await supabase
    .from('user_profiles')
    .select()
    .eq('team_id', teamId);

  if (error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(200).json(data);
  }
}
