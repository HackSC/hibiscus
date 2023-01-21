import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function disbandTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const repo = container.resolve(DashboardRepository);
    const teamId: string = req.body.team_id;
    const organizerId: string = req.body.organizer_id;

    if (!teamId) throw new Error('Team ID is missing.');
    if (!organizerId) throw new Error('Organizer ID is missing.');

    // verify user is organizer of team
    const isOrganizer = await repo.verifyUserIsOrganizer(organizerId, teamId);

    if (!isOrganizer) {
      throw new Error(
        'User is not the organizer and not authorized to this function.'
      );
    }

    // find all users related to team_id. update all their team_id to null
    const returnData = await repo.updateAllTeamMembersToNull(teamId);
    //delete all records of invites involving that team
    await repo.deleteTeamInvites(teamId);
    //delete record for corresponding team
    await repo.deleteTeam(teamId);

    //return deleted team members, maybe find way to append deleted team??
    return res.status(200).json(returnData.data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
