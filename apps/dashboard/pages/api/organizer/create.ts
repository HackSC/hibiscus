import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { DashboardRepository } from 'apps/dashboard/repository/DashboardRepository';

/**
 * [createTeam Creates a team in the teams table.]
 * @param  {[NextApiRequest]} req - (name, key, description, photo_key, user_id) : (string, string, string,
 *      string-link to photo, string-user_id of person creating team)
 * @param {[NextApiResponse]} res - Only used for returning Json messages
 * @return {[NextApiResponse]} 500 if error in creation. 200 if team created successfully
 */
export default async function createTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const supabase = repo.getClient();
  let name: string = req.body.name;
  let description: string | null = req.body.description;
  let photoKey: string | null = req.body.photo_key;
  let organizerId: string = req.body.organizer_id;

  //test name isnt "". Null and "" should be caught by frontend anyway but just in case
  if (!name) {
    return res.status(500).json({ message: 'Name cannot be empty.' });
  }

  //check to make sure accepted member doesn't already have a team
  //this could be redundant since supabase checks organizer_id is unique. TODO: consult
  let result = await repo.checkHasNoTeam(organizerId);
  if (result.error) {
    return res.status(500).json({ message: result.error.message });
  }

  //if length 0, user with same id without a team doesn't exist.
  if (result.data.length === 0) {
    return res.status(500).json({
      message:
        'You are already in a team. You cannot create one before leaving.',
    });
  }

  const { data, error } = await supabase
    .from('teams')
    .insert([
      {
        name: name,
        description: description,
        photo_key: photoKey,
        organizer_id: organizerId,
      },
    ])
    .select();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  //insert team_id into user_profiles table
  let updateOrganizerTeam = async (team_id) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ team_id: team_id })
      .eq('user_id', organizerId);

    return { data, error };
  };

  result = await updateOrganizerTeam(data[0]['team_id']);
  if (result.error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(201).json(data);
}
