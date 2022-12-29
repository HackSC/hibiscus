import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handle: NextApiHandler = async (req, res) => {
  const email = req.query.email as string;
  const resetCallbackUrl = req.query.resetCallbackUrl as string;
  const supabase = container.resolve(HibiscusSupabaseClient).getClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: resetCallbackUrl,
  });
  res.status(200).json({
    data,
    error,
  });
};

export default handle;
