import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { getTokensFromCookies } from 'apps/dashboard/common/utils';

export default async function kickTeamMember(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const repo = container.resolve(DashboardRepository);
    const kickId: string = req.body.kick_id;

    if (!kickId) {
      throw new Error('ID for the user to be kicked is missing.');
    }

    const hbc = container.resolve(HibiscusSupabaseClient);
    // Get current user to later check if the current user should be the one accepting the invite
    const { accessToken, refreshToken } = getTokensFromCookies(req);
    const user = await hbc.getUserProfile(accessToken, refreshToken);
    if (!user) {
      throw new Error('Endpoint inaccessible without active session.');
    }

    //get the kickedUser's team. Check that the team exists
    const userTeamResponse = await repo.getUserTeam(kickId);
    if (!userTeamResponse.data) {
      throw new Error('The selected user is not in a team. Cannot be kicked.');
    }
    if (userTeamResponse.error) {
      throw new Error(userTeamResponse.error.message);
    }
    const teamId = userTeamResponse.data.team_id;

    //get the organizer of the team and verify the user is the organizer
    const teamInfoResponse = await repo.getTeamInfo(teamId); //shouldn't be null since checked if null earlier
    if (teamInfoResponse.error) {
      throw new Error(teamInfoResponse.error.message);
    }
    const organizerId = teamInfoResponse.data.organizer_id;
    if (teamInfoResponse.data['organizer_id'] !== user.user_id) {
      throw new Error(
        'User is not the organizer and not authorized to this function.'
      );
    }

    //verify user is organizer of team
    // const isOrganizer = await repo.verifyUserIsOrganizer(organizerId, teamId);

    // if (!isOrganizer) {
    //   throw new Error(
    //     'User is not the organizer and not authorized to this function.'
    //   );
    // }

    //find kickId in user_profiles and set team_id to null
    let kickedUser = await repo.updateKickedUser(kickId, teamId);
    if (kickedUser.error) {
      throw new Error(kickedUser.error.message);
    }

    //returns the kicked user in case wanted to display
    return res.status(200).json(kickedUser.data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}
