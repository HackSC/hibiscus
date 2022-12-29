import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handle(req, res) {
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
