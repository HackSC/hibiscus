import 'reflect-metadata';
import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function invite( //anyone in a team can invite
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const repo = container.resolve(DashboardRepository);

    const teamId = req.body.team_id;
    const email = req.body.email;
    const organizerId = req.body.organizer_id;
    const invitedId = req.body.invited_id; //TODO: cover the params and see if invitedID necessary if have email???

    if (!teamId || !email || !organizerId || !invitedId) {
      throw new Error(
        'One of more required parameters is missing from message body.'
      );
    }

    //very first check, make sure invite doesn't already exist
    if (!(await repo.checkInviteDoesNotExist(teamId, invitedId))) {
      throw new Error('Invitation to that user already exists.');
    }

    //check to make sure team isn't full
    let result = await repo.getAllTeamMembers(teamId);
    if (result.data.length >= repo.MAX_TEAM_MEMBERS) {
      throw new Error('Team is already full (4 members max).');
    }

    let organizerFname: string;
    //get first names of organizer user
    for (let i = 0; i < result.data.length; i++) {
      if (result.data[0]['user_id'] === organizerId) {
        organizerFname = result.data[0]['first_name'];
      }
    }

    const teamName = (await repo.getTeamInfo(teamId)).data[0]['name'];

    //add check that invited user email even exists
    result = await repo.getUserByEmailAndId(invitedId, email);
    //length 0 if user with email does not exist
    if (result.data.length === 0) {
      throw new Error('User by that email does not exist.');
    }

    const invitedUserFname: string = result.data[0]['first_name'];

    console.log(`Organizer Fname: ${organizerFname}`);
    console.log(`Invited user fname: ${invitedUserFname}`);

    result = await repo.createInvite(organizerId, invitedId, teamId);

    const invitationId = result.data[0]['id'];

    //add logic for emailing invite
    //need invite id
    //invite email will link to the online version and send invite_id
    await repo.sendTeamInviteEmail(
      email,
      invitedUserFname,
      organizerFname,
      teamName,
      invitationId
    );

    return res.status(200).json({ message: 'Invite sent successfully!' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
