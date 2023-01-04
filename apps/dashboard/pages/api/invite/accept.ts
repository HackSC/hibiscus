import { DashboardRepository } from 'apps/dashboard/repository/DashboardRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
/**
 * [inviteApprove - When the team leader accepts the join request by another user]
 * @param  {[NextApiRequest]} req - (team_id, invite_id) : (string, string)
 * @param {[NextApiResponse]} res - Only used for returning Json messages
 * @return {[NextApiResponse]} 500 if error in creation. Happens when requesting user already has a team, team is full, or Postgres error.
 *  200 if join request was approved successfully and new team member is added.
 */
export default async function inviteAccept(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const supabase = repo.getClient();

  const query = req.query;
  const { inviteId } = query;

  //grab team_id, invitee_id
  let getInviteInfo = async () => {
    const { data, error } = await supabase
      .from('invitations')
      .select()
      .eq('id', inviteId);

    return { data, error };
  };

  let result = await getInviteInfo();
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }
  if (result.data.length === 0) {
    return res.status(500).json({ message: "Invite id doesn't exist." });
  }
  //extract team_id and invited_id from data object
  const teamId: string = result.data[0]['team_id']; //should exist in the returned data object
  const invitedId: string = result.data[0]['invited_id'];

  //check to make sure team isn't full
  result = await repo.memberCount(teamId);
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }
  if (result.data.length >= repo.MAX_TEAM_MEMBERS) {
    return res
      .status(500)
      .json({ message: 'Team is already full (4 members max).' });
  }

  //check to make sure accepted member doesn't already have a team
  result = await repo.checkHasNoTeam(invitedId);
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }

  if (result.data.length === 0) {
    return res.status(500).json({
      message:
        'Requesting member already has a team. They must leave before the invite can be accepted',
      //in the case of errors, should the invitation be deleted and a new one needs to be sent?
    });
  }

  let updaterUserAccepted = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ team_id: teamId })
      .eq('user_id', invitedId);

    return { data, error };
  };

  result = await updaterUserAccepted();
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }

  //Assuming invitation already exists in db, otherwise error prob thrown anyway
  let deleteAcceptedInvite = async () => {
    const { data, error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', inviteId);

    return { data, error };
  };

  result = await deleteAcceptedInvite();
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  } else {
    return res
      .status(200)
      .json({ message: 'Invite request accepted successfully!' });
  }

  //add redirect to whatever page needs to go
}
