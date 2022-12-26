import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'http://localhost:54321';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function inviteeAccept(req, res) {
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
    res
      .status(200)
      .json({ success_message: 'successfully accepted invitation' });
    //code for email notification
  }
}

async function inviteeDeny(req, res) {
  //just send email notification
}

async function inviteeRequest(req, res) {
  //send email to organizer
}

export default { inviteeAccept, inviteeDeny, inviteeRequest };
