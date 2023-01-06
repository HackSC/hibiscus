import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

// This acts as a way for any client apps to verify their tokens, and if it is invalid, redirect users to the SSO login page
const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { token } = req.body;
    const { data, error } = await container
      .resolve(HibiscusSupabaseClient)
      .verifyToken(token);
    res.status(200).json({ data, error });
  }
};

export default handler;
