import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

// PUT
const handler: NextApiHandler = async (req, res) => {
  const supabase = container.resolve(HibiscusSupabaseClient).getClient();
  if (req.method !== 'PUT') {
    return res.status(405).send('Method not allowed');
  }
  //just send email notification
  //delete invitation record
  const inviteId = req.body.invite_id as string;
  const { error } = await supabase
    .from('invitations')
    .update({ status: -1 })
    .eq('id', inviteId);
  if (error != null) {
    console.log(error.message);
    res.status(500).json({ error: 'Something unexpected happened' });
  } else {
    res.status(200).json({ message: 'successfully denied invitation' });
  }
};

export default handler;
