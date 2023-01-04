import { DashboardRepository } from 'apps/dashboard/repository/DashboardRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function disbandTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const supabase = repo.getClient();
  let teamId: string = req.body.team_id;
  let organizerId: string = req.body.organizer_id;
  //verify user is organizer of team
  let isOrganizer = await repo.verifyUserIsOrganizer(organizerId, teamId);

  if (!isOrganizer) {
    res.status(500).json({
      message: 'User is not the organizer and not authorized to this function.',
    });
  }

  //find all users related to team_id. update all their team_id to null
  let updateAllTeamMembers = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ team_id: null })
      .eq('team_id', teamId)
      .select();

    return { data, error };
  };

  let returnData = await updateAllTeamMembers();
  if (returnData.error) {
    return res.status(500).json({ message: returnData.error.message });
  }

  //delete all records of invites involving that team
  let deleteInvites = async () => {
    const { data, error } = await supabase
      .from('invitations')
      .delete()
      .eq('team_id', teamId);
    return { data, error };
  };
  let result = await deleteInvites();
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }

  //delete record for corresponding team
  let deleteTeam = async () => {
    const { data, error } = await supabase
      .from('teams')
      .delete()
      .eq('team_id', teamId);
    return { data, error };
  };

  result = await deleteTeam();
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }

  //return deleted team members, maybe find way to append deleted team??
  return res.status(200).json(returnData.data);
}
