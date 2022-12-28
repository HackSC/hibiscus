import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const token = req.cookies[process.env.HIBISCUS_COOKIE_NAME];
    if (token != null) {
      const { data } = await HibiscusSupabaseClient.verifyToken(token);

      if (data.user != null) {
        res.status(200).json({ token });
        return;
      }
    }

    res.status(400).json({ error: 'No valid session found' });
  }
};

export default handler;
