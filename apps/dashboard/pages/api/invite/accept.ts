import { DashboardRepository } from '../../../repository/dashboard.repository';
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
  try {
    const repo = container.resolve(DashboardRepository);
    const supabase = repo.getClient();

    const query = req.query;
    const { inviteId } = query;

    if (!inviteId) {
      throw new Error('Invite ID is missing or null.');
    }

    let stringifyInviteId = inviteId.toString();

    //Gets invited_id and team_id. Also check if invite exists by checking length of getInvite.
    let result = await repo.getInviteInfo(stringifyInviteId);
    if (result.data.length === 0) {
      throw new Error('Invite with the given ID does not exist.');
    }

    //extract team_id and invited_id from data object. Should only contain one invitation anyway
    const teamId: string = result.data[0]['team_id'];
    const invitedId: string = result.data[0]['invited_id'];

    //check to make sure team isn't full
    result = await repo.getAllTeamMembers(teamId);
    console.log(result.data);
    if (result.data.length >= repo.MAX_TEAM_MEMBERS) {
      throw new Error('Team is already full (4 MEMBER MAX).');
    }

    //check to make sure accepted member doesn't already have a team
    result = await repo.checkHasNoTeam(invitedId);
    if (result.data.length === 0) {
      throw new Error(
        'Requesting member already has a team. They must leave before the invite can be accepted'
      );
    }

    await repo.updateUserWithAcceptedInvite(teamId, invitedId);

    //Assuming invitation already exists in db, otherwise error prob thrown anyway
    result = await repo.deleteAcceptedInvite(stringifyInviteId);
    return res
      .status(200)
      .json({ message: 'Invite request accepted successfully!' });

    //add redirect to whatever page needs to go
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
