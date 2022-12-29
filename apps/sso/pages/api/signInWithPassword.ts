import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
  const supabase = container.resolve(HibiscusSupabaseClient).getClient();
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user) {
      res.setHeader('Set-Cookie', [
        `${process.env.HIBISCUS_COOKIE_NAME}=${data.session.access_token}; Path=/; Domain=${process.env.HIBISCUS_DOMAIN}; Max-Age=${process.env.HIBISCUS_COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=None`,
        `${process.env.HIBISCUS_COOKIE_NAME}=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=None`,
      ]);
    }
    res.status(200).json({ data, error });
  }
};

export default handler;
