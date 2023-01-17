import 'reflect-metadata';
import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { UserRepository } from '../../../repository/user.repository';

export default async function invite( //anyone in a team can invite
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const repo = container.resolve(DashboardRepository);
    const userRepo = container.resolve(UserRepository);

    const email = req.body.email;
    const organizerId = req.body.organizerId;

    if (!email || !organizerId) {
      throw new Error(
        'One of more required parameters is missing from message body.'
      );
    }

    const team = await repo.getUserTeam(organizerId);
    if (team.error) {
      throw new Error(team.error.message);
    }
    const teamId = team.data.team_id;

    const invitedUser = await userRepo.getUserIdByEmail(email);
    if (invitedUser.error) {
      throw new Error(invitedUser.error.message);
    }
    const invitedId = invitedUser.data.user_id;

    //very first check, make sure invite doesn't already exist
    if (!(await repo.checkInviteDoesNotExist(teamId, invitedId))) {
      throw new Error('Invitation to that user already exists.');
    }

    //check to make sure team isn't full
    const teamMembers = await repo.getAllTeamMembers(teamId);
    if (teamMembers.data.length >= repo.MAX_TEAM_MEMBERS) {
      throw new Error('Team is already full (4 members max).');
    }

    //get first names of organizer user
    const organizerFname: string | null = teamMembers.data.find(
      (member) => member['user_id'] === organizerId
    )?.first_name;
    if (organizerFname === null) {
      throw new Error('[ERROR]: organizer not in own team');
    }

    const teamName = (await repo.getTeamInfo(teamId)).data[0]['name'];

    //add check that invited user email even exists
    const result = await repo.getUserByEmailAndId(invitedId, email);
    //length 0 if user with email does not exist
    if (result.data.length === 0) {
      throw new Error('User by that email does not exist.');
    }

    const invitedUserFname: string = result.data[0]['first_name'];

    await repo.createInvite(organizerId, invitedId, teamId);

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

    return res
      .status(200)
      .json({
        message: 'Invite sent successfully!',
        data: { inviteId: invitationId },
      });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
