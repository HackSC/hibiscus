import { DashboardRepository } from 'apps/dashboard/repository/DashboardRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function invite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const supabase = repo.getClient();

  let teamId = req.body.team_id;

  //check to make sure team isn't full
  let result = await repo.memberCount(teamId);
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }
  if (result.data.length >= repo.MAX_TEAM_MEMBERS) {
    return res
      .status(500)
      .json({ message: 'Team is already full (4 members max).' });
  }

  //add check that invited user email even exists

  const { error } = await supabase.from('invitations').insert([
    {
      inviter_id: req.body.user_id, //TODO: go over the parameter name scheme for endpoints. user_id or inviter_id
      invitee_id: req.body.invitee_id,
      team_id: req.body.team_id,
    },
  ]);

  if (error) {
    return res.status(500).json({ message: error.message });
  }
  //add logic for emailing invite
  //need team name, organizer's name
  //invite email will link to the online version and send team_id, invite_id
  //check if email exists btw
  return res.status(200).json({ message: 'Invite sent successfully!' });
}
