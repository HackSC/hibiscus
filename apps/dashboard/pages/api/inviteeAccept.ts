import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
  const supabase = container.resolve(HibiscusSupabaseClient).getClient();
  //add the team id to the user prfiles
  const teamId = req.body.team_id as string;
  const userId = req.body.user_id as string;
  const inviteId = req.body.invitation_id as string;
  const { error } = await supabase
    .from('user_profiles')
    .update({ team_id: teamId })
    .eq('user_id', userId);

  if (error !== null) {
    console.log(error.message);
    //response with internal server error
    res.status(500).json({ error_message: error.message });
  } else {
    //delete the request in the db
    const { error } = await supabase
      .from('invitations')
      .update({ status: 1 })
      .eq('id', inviteId);
    if (error != null) {
      console.log(error.message);
    } else {
      res
        .status(200)
        .json({ success_message: 'successfully accepted invitation' });
      //code for email notification
    }
  }
};

export default handler;
