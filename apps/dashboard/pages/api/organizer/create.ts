import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { DashboardRepository } from '../../../repository/dashboard.repository';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TSRV_RELEASE_FLAG } from '../../../common/constants';

/**
 * Creates a team in the teams table
 * @param req - (name, description, photoKey, userId) : (string, string,
 *      string-link to photo, string-user_id of person creating team)
 * @param res - Only used for returning Json messages
 * @return 500 if error in creation. 200 if team created successfully
 */
export default async function createTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const name: string = req.body.name;
  const description: string | null = req.body.description;
  const photoKey: string | null = req.body.photoKey;
  const organizerId: string = req.body.organizerId;

  try {
    //check to make sure accepted member doesn't already have a team
    //test name isnt "". Null and "" should be caught by frontend anyway but just in case
    if (!name) {
      throw new Error('Name cannot be empty.');
    }
    if (!organizerId) {
      throw new Error('Organizer ID is empty.');
    }

    //this could be redundant since supabase checks organizer_id is unique.
    let result = await repo.checkHasNoTeam(organizerId);

    //if length 0, user with same id without a team doesn't exist.
    if (result.data.length === 0) {
      throw new Error(
        'You are already in a team. You cannot create one before leaving.'
      );
    }

    const insertedTeam = await repo.insertTeam(
      name,
      description,
      photoKey,
      organizerId
    );

    if (insertedTeam.error) {
      throw new Error(insertedTeam.error.message);
    }

    const teamId = insertedTeam.data[0]['team_id'];

    //insert team_id into user_profiles table
    result = await repo.updateOrganizerTeam(teamId, organizerId);

    return res.status(201).json({ id: teamId });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
