import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
// import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
// import { getEnv } from '@hibiscus/env';

// const getTokensFromCookies = (req: NextApiRequest) => {
//   const accessToken = req.cookies[getEnv().Hibiscus.Cookies.accessTokenName];
//   const refreshToken = req.cookies[getEnv().Hibiscus.Cookies.refreshTokenName];
//   return { accessToken, refreshToken };
// };

/**
 * inviteApprove - When the team leader accepts the join request by another user]
 * @param req - (inviteId) : (string)
 * @param res - Only used for returning Json messages
 * @return 500 if error in creation. Happens when requesting user already has a team, team is full, or Postgres error.
 *  200 if join request was approved successfully and new team member is added.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(401).send({ message: 'Method not supported' });
  }

  try {
    const repo = container.resolve(DashboardRepository);
    const { inviteId } = req.query;
    if (!inviteId) {
      throw new Error('Invite ID is missing or null.');
    }
    const stringifyInviteId = inviteId.toString();

    //Gets invited_id and team_id. Also check if invite exists by checking length of getInvite.
    let result = await repo.getInviteInfo(stringifyInviteId);
    if (result.data.length === 0) {
      throw new Error('Invite with the given ID does not exist.');
    }

    //extract team_id and invited_id from data object. Should only contain one invitation anyway
    const teamId: string = result.data[0]['team_id'];
    const invitedId: string = result.data[0]['invited_id'];

    // check if user is the one making invite
    // const { accessToken, refreshToken } = getTokensFromCookies(req);
    // const hbc = container.resolve(HibiscusSupabaseClient);
    // const user = await hbc.getUserProfile(accessToken, refreshToken);
    // if(user.user_id!==invitedId) {
    //   throw new Error("You may not accept this invite");
    // }

    //check to make sure team isn't full
    result = await repo.getAllTeamMembers(teamId);
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
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
