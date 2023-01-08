import { DashboardRepository } from '../../../repository/dashboard.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function invite( //anyone in a team can invite
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  const checkEmailExists = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select()
      .eq('email', email);

    return { data, error };
  };

  result = await checkEmailExists();
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }
  //length 0 if user with email does not exist
  if (result.data.length === 0) {
    return res
      .status(500)
      .json({ message: 'Invitation email does not exist.' });
  }

  const { error } = await supabase.from('invitations').insert([
    {
      organizer_id: organizerId, //TODO: go over the parameter name scheme for endpoints. user_id or inviter_id
      invited_id: invitedId,
      team_id: teamId,
    },
  ]);

  if (error) {
    return res.status(500).json({ message: error.message });
  }
  //add logic for emailing invite
  //need team name, organizer's name
  //invite email will link to the online version and send invite_id

  return res.status(200).json({ message: 'Invite sent successfully!' });
}
