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

  async getDiscordToken(userId: string): Promise<string | null> {
    const { data, error } = await this.client
      .from('discord_tokens')
      .select()
      .eq('user_id', userId)
      .maybeSingle();

    if (error != null) {
      throw new Error(error.message);
    }

    if (data == null) {
      return null;
    }

    return data.discord_verification_token;
  }
}
