import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class DiscordRepository {
  private client: SupabaseClient;
  constructor(private readonly hbc: HibiscusSupabaseClient) {
    hbc.setOptions({ useServiceKey: true });
    this.client = hbc.getClient();
  }

  async getDiscordToken(userId: string): Promise<string> {
    const { data, error } = await this.client
      .from('discord_tokens')
      .select('discord_verification_token')
      .eq('user_id', userId);

    if (error != null) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      // Generate new token
      const { data, error } = await this.client
        .from('discord_tokens')
        .insert({ user_id: userId })
        .select('discord_verification_token')
        .single();

      if (error != null) {
        throw new Error(error.message);
      }

      return data.discord_verification_token;
    }

    return data[0].discord_verification_token;
  }
}
