import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class User {
  private client: SupabaseClient;
  constructor(private readonly hbc: HibiscusSupabaseClient) {
    this.client = hbc.getClient();
  }

  async getPoints(userId: string) {
    const { data, error } = await this.client
      .from('leaderboard')
      .select('bonus_points, event_points')
      .eq('user_id', userId);
    return { data, error };
  }

  async getBonusPoints(userId: string) {
    const { data, error } = await this.client
      .from('leaderboard')
      .select('bonus_points')
      .eq('user_id', userId);
    return { data, error };
  }

  async updateBonusPoints(userId: string, bonus_points: number) {
    const { data, error } = await this.client
      .from('leaderboard')
      .update({ bonus_points: bonus_points })
      .eq('user_id', userId);
    return { data, error };
  }
}
