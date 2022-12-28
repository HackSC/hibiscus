import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
// const supabaseUrl = 'https://anzqbrsbjgqaphrfiaqv.supabase.co';
const supabaseUrl = 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
  let name: string = req.body.name;
  let description: string | null = req.body.description;
  let photoKey: string | null = req.body.photo_key;
  let organizerId: string = req.body.user_id;

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

  if (error !== null) {
    return res.status(500).json({ message: error.message });
  } else {
    return res.status(200).json(data);
  }
}
