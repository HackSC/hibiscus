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

    const { data, error } = await repo.getUserTeam(organizerId);
    if (error) {
      throw new Error(error.message);
    }

    const invitedUser = await userRepo.getUserIdByEmail(email);
    if (invitedUser.error) {
      throw new Error(
        "There's no user under this email! Please make sure whoever you invited have registered an account on HackSC"
      );
    }
    const invitedId = invitedUser.data.user_id;

    // people who made the team invites can't invite themselves (obviously)
    if (invitedId === organizerId) {
      throw new Error(
        `You're so lonely you invited yourself to your own team! 
        Please invite someone else but yourself or get some friends :) 
        -- 
        Sincerely, 
        HackSC Engineering
      `
      );
    }

    //very first check, make sure invite doesn't already exist
    const teamId = data.team_id;
    const team = await repo.getTeamInfo(teamId);
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

    const teamName = team.data.name;
    const invitedUserFname: string = invitedUser.data.first_name;
    const invitedUserLname: string = invitedUser.data.last_name;
    const resCreateInvite = await repo.createInvite(
      organizerId,
      invitedId,
      teamId
    );
    const invitationId = resCreateInvite.data[0].id;
    const invitationCreatedAt = resCreateInvite.data[0].created_at;

    //add logic for emailing invite
    //need invite id
    //invite email will link to the online version and send invite_id
    if (process.env.NODE_ENV === 'production') {
      await repo.sendTeamInviteEmail(
        email,
        invitedUserFname,
        organizerFname,
        teamName,
        invitationId
      );
    }

    return res.status(200).json({
      message: 'Invite sent successfully!',
      data: {
        inviteId: invitationId,
        createdAt: invitationCreatedAt,
        invitee: {
          id: invitedId,
          firstName: invitedUserFname,
          lastName: invitedUserLname,
          email,
        },
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: e.message });
  }
}
