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
