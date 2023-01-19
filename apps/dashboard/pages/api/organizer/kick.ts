import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function kickTeamMember(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const repo = container.resolve(DashboardRepository);
    const kickId: string = req.body.kickId;

    if (!kickId) {
      throw new Error('One or more of the required parameters is missing.');
    }

    //verify user is organizer of team
    const userTeamResponse = await repo.getUserTeam(kickId);
    if (userTeamResponse.error) {
      throw new Error(userTeamResponse.error.message);
    }
    const teamId = userTeamResponse.data.team_id;
    const teamInfoResponse = await repo.getTeamInfo(teamId);
    if (teamInfoResponse.error) {
      throw new Error(teamInfoResponse.error.message);
    }
    const organizerId = teamInfoResponse.data.organizer_id;
    const isOrganizer = await repo.verifyUserIsOrganizer(organizerId, teamId);

    if (!isOrganizer) {
      throw new Error(
        'User is not the organizer and not authorized to this function.'
      );
    }

    //find kickId in user_profiles and set team_id to null
    const result = await repo.updateKickedUser(kickId, teamId);

    if (result.error) {
      throw new Error(result.error.message);
    }

    //returns the kicked user in case wanted to display
    return res.status(200).json(result.data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
}
