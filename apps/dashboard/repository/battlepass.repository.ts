import { injectable } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';

@injectable()
export class BattlePassRepository {
  private client: SupabaseClient;

  constructor(private readonly hbc: HibiscusSupabaseClient) {
    hbc.setOptions({ useServiceKey: true });
    this.client = hbc.getClient();
  }

  async getLeaderboard(pageNumber: number, pageSize: number) {
    const { data, error } = await this.client
      .from('leaderboard')
      .select(
        `
          bonus_points,
          event_points,
          total_points,
          user_profiles(
            first_name,
            last_name
          )
        `
      )
      .order('total_points', { ascending: false })
      .range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1);

    console.log(error);

    return { data, error };
  }

  async getPosition(userId: string) {
    // TODO handle error??
    const { data } = await this.client
      .from('leaderboard')
      .select()
      .order('total_points', { ascending: false });

    let userFoundIndex = -1;
    if (data != null) {
      userFoundIndex = data.findIndex((it) => it.user_id == userId);
    }

    return { data: { place: userFoundIndex + 1 } };
  }

  async getTotalPoints(userId: string) {
    // TODO handle error??
    const { data } = await this.client
      .from('leaderboard')
      .select('total_points')
      .eq('user_id', userId)
      .maybeSingle();

    if (data != null) {
      return { data: { points: data.total_points } };
    } else {
      return { data: { points: 0 } };
    }
  }
}
