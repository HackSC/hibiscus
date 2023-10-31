import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.query;
  const userIdString = userId.toString();

  if (req.method === 'PUT') {
    const supabase = container.resolve(HibiscusSupabaseClient);
    supabase.setOptions({ useServiceKey: true });

    const resEmail = await supabase
      .getClient()
      .from('user_profiles')
      .select('email')
      .eq('user_id', userIdString);

    if (resEmail.error != null) {
      return res.status(500).json({ message: resEmail.error.message });
    }

    if (resEmail.data.length === 0) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const email = resEmail.data[0].email as string;

    const resRole = await supabase
      .getClient()
      .from('user_invites')
      .select('role')
      .eq('email', email);

    if (resRole.error != null) {
      return res.status(500).json({ message: resRole.error.message });
    }

    if (resRole.data.length === 0) {
      return res.status(200).json({
        message: 'User does not have special role; no role change executed',
      });
    }

    const role = resRole.data[0].role as number;

    const resUpdate = await supabase
      .getClient()
      .from('user_profiles')
      .update({ role })
      .eq('user_id', userId);

    if (resUpdate.error != null) {
      return res.status(500).json({ message: resUpdate.error.message });
    }

    return res.status(200).json({ message: 'Success' });
  } else {
    return res.status(405).json({ message: 'Invalid request type.' });
  }
};

export default handler;
