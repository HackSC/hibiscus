import { injectable } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { getEnv } from '@hibiscus/env';
import { SupabaseClient } from '@supabase/supabase-js';

@injectable()
export class DashboardRepository {
  private client: SupabaseClient;
  private static readonly env = getEnv();

  async getLeaderboard(userId: string) {
    const { data, error } = await this.client
      .from('leaderboard')
      .select()
      .eq('user_id', userId);
    return { data, error };
  }
}
