import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class Leaderboard {
  private client: SupabaseClient;
  constructor(private readonly hbc: HibiscusSupabaseClient) {
    this.client = hbc.getClient();
  }

  async getLeaderboard() {
    const { data, error } = await this.client.from('leaderboard').select();
    return { data, error };
  }

  async getUserRank(userId) {
    const { data, error } = await this.client
      .from('leaderboard')
      .select()
      .eq('user_id', userId);
    return { data, error };
  }
}
