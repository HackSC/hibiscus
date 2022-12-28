import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { MAX_MEMBERS, memberCount } from '../misc-methods';
// const supabaseUrl = 'https://anzqbrsbjgqaphrfiaqv.supabase.co';
const supabaseUrl = 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function invite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //check to make sure team isn't full
  let result = await memberCount(req, res);
  if (result.error !== null) {
    return res.status(500).json({ message: result.error.message });
  }
  if (result.data.length >= MAX_MEMBERS) {
    return res
      .status(500)
      .json({ message: 'Team is already full (4 members max).' });
  }

  const { error } = await supabase.from('invitations').insert([
    {
      inviter_id: req.body.user_id,
      invitee_id: req.body.invitee_id,
      team_id: req.body.team_id,
    },
  ]);

  if (error) {
    return res.status(500).json({ message: error.message });
  } else {
    //add logic for emailing the invite 1) smtp 2) api
    return res.status(200).json({ message: 'Invite sent successfully!' });
  }
}
