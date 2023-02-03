import { injectable } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';

@injectable()
export class BonusPoints {
  private client: SupabaseClient;
  constructor(private readonly hbc: HibiscusSupabaseClient) {
    this.client = hbc.getClient();
  }

  async getBonusPointEvents() {
    const { data, error } = await this.client.from('bonus_points').select();
    return { data, error };
  }

  // add a bonus_points_log, meant to update user status
  async addBonusPointsLog(
    userId: string,
    bonusPointsId: string,
    status: -1 | 0 | 1
  ) {
    const { data, error } = await this.client
      .from('bonus_points_log')
      .insert({ user_id: userId, bonus_points_id: bonusPointsId, status });
    if (error) throw error;
    return data;
  }

  // get the most recent log for the user
  async getMostRecentBonusPointsLogUser(userId: string) {
    throw new Error('not implemented');
  }
}
