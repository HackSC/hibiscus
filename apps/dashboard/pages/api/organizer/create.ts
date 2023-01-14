import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { DashboardRepository } from '../../../repository/dashboard.repository';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';

/**
 * Creates a team in the teams table
 * @param req - (name, key, description, photo_key, user_id) : (string, string, string,
 *      string-link to photo, string-user_id of person creating team)
 * @param res - Only used for returning Json messages
 * @return 500 if error in creation. 200 if team created successfully
 */
export default async function createTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const supabase = repo.getClient();
  const name: string = req.body.name;
  const description: string | null = req.body.description;
  const photoKey: string | null = req.body.photo_key;
  const organizerId: string = req.body.organizer_id;

  console.log(`Name: ${name}`);
  console.log(`Desc: ${description}`);
  console.log(`PhotoKey: ${photoKey}`);
  console.log(`Organizer ID: ${organizerId}`);

  const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx);
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log(session);
  };

  console.log(`Session data???: ${supabase.auth.getUser()}`);

  try {
    const {
      data: { session },
    } = await repo.getClient().auth.getSession();

    if (!session)
      return res.status(401).json({
        error: 'not_authenticated',
        description:
          'The user does not have an active session or is not authenticated',
      });

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
    console.log(result.data);

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
    let teamId = insertedTeam.data[0]['team_id'];

    //insert team_id into user_profiles table
    result = await repo.updateOrganizerTeam(teamId, organizerId);

    return res.status(201).json(insertedTeam.data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
