import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function invite( //anyone in a team can invite
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const repo = container.resolve(DashboardRepository);
    const supabase = repo.getClient();

    let teamId = req.body.team_id;
    let email = req.body.email;
    let organizerId = req.body.organizer_id;
    let invitedId = req.body.invited_id; //TODO: cover the params and see if invitedID necessary if have email???

    if (!teamId || !email || !organizerId || !invitedId) {
      throw new Error(
        'One of more required parameters is missing from message body.'
      );
    }

    //check to make sure team isn't full
    let result = await repo.getAllTeamMembers(teamId);
    if (result.error) {
      return res.status(500).json({ message: result.error.message });
    }
    if (result.data.length >= repo.MAX_TEAM_MEMBERS) {
      return res
        .status(500)
        .json({ message: 'Team is already full (4 members max).' });
    }

    //add check that invited user email even exists
    result = await repo.getUserByEmail(email);
    //length 0 if user with email does not exist
    if (result.data.length === 0) {
      throw new Error('User by that email does not exist.');
    }

    result = await repo.createInvite(organizerId, invitedId, teamId);

    const invitationId = result.data[0]['id'];

    //add logic for emailing invite
    //need invite id
    //invite email will link to the online version and send invite_id

    return res.status(200).json({ message: 'Invite sent successfully!' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
