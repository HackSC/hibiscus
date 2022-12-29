import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { memberCount } from '../misc-methods';
const supabaseUrl = 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//TODO: consider whether a rejected user is not allowed to request anymore

/**
 * [inviteReject - When the team leader rejects the join request by another user]
 * @param  {[NextApiRequest]} req - (user_id) : (string)
 * @param {[NextApiResponse]} res - Only used for returning Json messages
 * @return {[NextApiResponse]} 500 if error in creation like Postgres error.
 *  200 if join request was rejected successfully.
 */
export default async function inviteReject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //only need to delete the invitation
  //Assuming invitation already exists in db, otherwise error prob thrown anyway
  let deleteAcceptedInvite = async () => {
    const { data, error } = await supabase
      .from('invitations')
      .delete()
      .eq('invitee_id', req.body.user_id)
      .eq('team_id', req.body.team_id);

    return { data, error };
  };

  let result = await deleteAcceptedInvite();
  if (result.error !== null) {
    return res.status(500).json({ message: result.error.message });
  } else {
    return res.status(200).json({ message: 'Invite request rejected.' });
  }
}
