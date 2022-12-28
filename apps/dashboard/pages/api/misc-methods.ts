//NOT AN API ENDPOINT
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
const supabaseUrl = 'https://anzqbrsbjgqaphrfiaqv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export const MAX_MEMBERS = parseInt(process.env.MAX_TEAM_MEMBERS);
export async function memberCount(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase
    .from('user_profile')
    .select()
    .eq('team_id', req.body.team_id);

  return { data, error };
}
