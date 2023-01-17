import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function kickTeamMember(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const repo = container.resolve(DashboardRepository);

    const teamId: string = req.body.team_id;
    const organizerId: string = req.body.organizer_id;
    const kickId: string = req.body.kick_id;

    if (!teamId || !organizerId || !kickId) {
      throw new Error('One or more of the required parameters is missing.');
    }

    //verify user is organizer of team
    const isOrganizer = await repo.verifyUserIsOrganizer(organizerId, teamId);

    if (!isOrganizer) {
      throw new Error(
        'User is not the organizer and not authorized to this function.'
      );
    }

    //find kickId in user_profiles and set team_id to null
    const result = await repo.updateKickedUser(kickId, teamId);

    //returns the kicked user in case wanted to display
    return res.status(200).json(result.data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
