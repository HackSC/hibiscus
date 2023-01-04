import { DashboardRepository } from 'apps/dashboard/repository/DashboardRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';

export default async function kickTeamMember(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const supabase = repo.getClient();

  let teamId: string = req.body.team_id;
  let organizerId: string = req.body.organizer_id; //TODO: consult if should be user_id or organizer_id
  let kickId: string = req.body.kick_id;

  console.log(teamId);
  console.log(`organizerID: ${organizerId}`);
  console.log(`kick id: ${kickId}`);

  //verify user is organizer of team
  let isOrganizer = await repo.verifyUserIsOrganizer(organizerId, teamId);

  if (!isOrganizer) {
    res.status(500).json({
      message: 'User is not the organizer and not authorized to this function.',
    });
  }

  //find kickId in user_profiles and set team_id to null
  let updateKickedUser = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ team_id: null })
      .eq('user_id', kickId)
      .eq('team_id', teamId)
      .select();

    return { data, error };
  };

  let result = await updateKickedUser();
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }

  //returns the kicked user in case wanted to display
  return res.status(200).json(result.data);
}
