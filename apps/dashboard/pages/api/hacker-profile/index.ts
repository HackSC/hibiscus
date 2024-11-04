import 'reflect-metadata';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import {
  getTokensFromNextRequest,
  rateLimitHandler,
} from '../../../common/utils';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }
  const hibiscus = container.resolve(HibiscusSupabaseClient);
  hibiscus.setOptions({ useServiceKey: true });

  const { accessToken } = getTokensFromNextRequest(req);
  const user = (await hibiscus.getUserProfile(accessToken)).user_id;

  const userProfile = await hibiscus
    .getClient()
    .from('user_profiles')
    .select('first_name, last_name, bio, username')
    .eq('user_id', user)
    .single();

  if (userProfile.error) {
    return res.status(500).json({ message: userProfile.error.message });
  }

  const userParticipantProfile = await hibiscus
    .getClient()
    .from('participants')
    .select('major, school, graduation_year')
    .eq('id', user)
    .single();

  if (
    userParticipantProfile.error &&
    userParticipantProfile.error.code !== 'PGRST116'
  ) {
    return res
      .status(500)
      .json({ message: userParticipantProfile.error.message });
  }

  let userObj = {
    ...userProfile.data,
    major: null,
    school: null,
    graduation_year: null,
  };

  if (!userParticipantProfile.error) {
    userObj = { ...userObj, ...userParticipantProfile.data };
  };

  return res.status(200).json({ success: true, data: userObj });
};

export default handler;
