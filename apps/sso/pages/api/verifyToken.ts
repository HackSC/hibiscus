import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
  const supabase = container.resolve(HibiscusSupabaseClient).getClient();
  if (req.method === 'POST') {
    const { email, token, type } = req.body;
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type,
    });
    res.status(200).json({ data, error });
  }
};

export default handler;
