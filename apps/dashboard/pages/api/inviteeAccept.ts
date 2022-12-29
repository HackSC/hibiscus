import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handle(req, res) {
  //add the team id to the user prfiles
  const { error } = await supabase
    .from('user_profiles')
    .update({ team_id: req.team_id })
    .eq('user_id', req.user_id);

  if (error !== null) {
    console.log(error.message);
    //response with internal server error
    res.status(500).json({ error_message: error.message });
  } else {
    //delete the request in the db
    const { error } = await supabase
      .from('invitations')
      .update({ status: 1 })
      .eq('id', req.invitation_id);
    if (error != null) {
      console.log(error.message);
    } else {
      res
        .status(200)
        .json({ success_message: 'successfully accepted invitation' });
      //code for email notification
    }
  }
}

async function inviteeDeny(req, res) {
  //just send email notification
  //delete invitation record
  const { error } = await supabase
    .from('invitations')
    .update({ status: -1 })
    .eq('id', req.invitation_id);
  if (error != null) {
    console.log(error.message);
  } else {
    res.status(200).json({ success_message: 'successfully denied invitation' });
  }
}

async function inviteeRequest(req, res) {
  //send email to organizer
  const { error } = await supabase.from('requests').insert({
    hacker_id: req.hacker_id,
    organizer_id: req.organizer_id,
    team_id: req.team_id,
    status: 0,
  });

  if (error != null) {
    console.log(error.message);
    res.status(500).json({ error_message: error.message });
  } else {
    res.status(200).json({ success_message: 'successfully sent request' });
  }
}

export default { inviteeAccept, inviteeDeny, inviteeRequest };
