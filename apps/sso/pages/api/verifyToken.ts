import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

// This acts as a way for any client apps to verify their tokens, and if it is invalid, redirect users to the SSO login page
// Response: JSON object containing data and error properties
// Data contains user and session properties, either of which may be null or undefiend
const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { access_token, refresh_token } = req.body;
    const { data, error } = await container
      .resolve(HibiscusSupabaseClient)
      .verifyToken(access_token, refresh_token);
    res.status(200).json({ data, error });
  }
};

export default handler;
