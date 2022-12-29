import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { MAX_MEMBERS, memberCount } from '../misc-methods';
const supabaseUrl = 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//TODO: consider whether i need to check if leader can only see and do this

/**
 * [inviteApprove - When the team leader accepts the join request by another user]
 * @param  {[NextApiRequest]} req - (team_id, user_id) : (string, string)
 * @param {[NextApiResponse]} res - Only used for returning Json messages
 * @return {[NextApiResponse]} 500 if error in creation. Happens when requesting user already has a team, team is full, or Postgres error.
 *  200 if join request was approved successfully and new team member is added.
 */
export default async function inviteAccept(
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

  //check to make sure accepted member doesn't already have a team
  let checkAcceptedHasNoTeam = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select()
      .eq('user_id', req.body.user_id)
      .is('team_id', null);
    return { data, error };
  };

  result = await checkAcceptedHasNoTeam();
  if (result.error !== null) {
    return res.status(500).json({ message: result.error.message });
  }

  if (result.data.length > 0) {
    return res.status(500).json({
      message:
        'Requesting member already has a team. They must leave before the invite can be accepted',
      //in the case of errors, should the invitation be deleted and a new one needs to be sent?
    });
  }

  let updaterUserAccepted = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ team_id: req.body.team_id })
      .eq('user_id', req.body.user_id);

    return { data, error };
  };

  result = await updaterUserAccepted();
  if (result.error !== null) {
    return res.status(500).json({ message: result.error.message });
  }

  //Assuming invitation already exists in db, otherwise error prob thrown anyway
  let deleteAcceptedInvite = async () => {
    const { data, error } = await supabase
      .from('invitations')
      .delete()
      .eq('invitee_id', req.body.user_id)
      .eq('team_id', req.body.team_id);

    return { data, error };
  };

  result = await deleteAcceptedInvite();
  if (result.error !== null) {
    return res.status(500).json({ message: result.error.message });
  } else {
    return res
      .status(200)
      .json({ message: 'Invite request accepted successfully!' });
  }
}
