import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { getEnv } from '@hibiscus/env';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { DiscordRepository } from '../../../repository/discord.repository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DiscordRepository);
  const { userId } = req.query;
  const stringifyId = userId.toString();

  try {
    //Get logic
    if (req.method === 'GET') {
      const supabase = new HibiscusSupabaseClient();
      supabase.setOptions({ useServiceKey: true });
      const user = await supabase.getUserProfile(
        req.cookies[getEnv().Hibiscus.Cookies.accessTokenName]
      );
      if (stringifyId !== user.user_id) {
        return res.status(401).json({ message: 'Invalid access token' });
      }

      const discordToken = await repo.getDiscordToken(stringifyId);

      if (discordToken === null) {
        return res
          .status(404)
          .json({ message: 'No discord token found for user' });
      }

      return res.status(200).json({ token: discordToken });
    }
    return res.status(405).json({ message: 'Invalid request type.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
