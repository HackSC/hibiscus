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

  async setBonusPointPending(userId: string, bonusPointId: string) {
    const res = await this.client.from('bonus_points_log').upsert({
      user_id: userId,
      bonus_points_id: bonusPointId,
      status: 0,
    });

    if (res.error) throw res.error;
  }

  async setBonusPointApproved(userId: string, bonusPointId: string) {
    const exists = await this.client
      .from('bonus_points_log')
      .select('*')
      .eq('user_id', userId)
      .eq('bonus_points_id', bonusPointId)
      .eq('status', 1);

    if (exists.error != null) {
      throw exists.error;
    }

    if (exists.data.length === 0) {
      const res = await this.client
        .from('bonus_points_log')
        .upsert({
          user_id: userId,
          bonus_points_id: bonusPointId,
          status: 1,
        })
        .select('bonus_points (points)');

      if (res.error) throw res.error;

      const userLeaderboardMatches = await this.client
        .from('leaderboard')
        .select()
        .eq('user_id', `${userId}`);

      if (userLeaderboardMatches.data.length == 0) {
        const resLeaderboard = await this.client.from('leaderboard').insert({
          user_id: userId,
          bonus_points: res.data[0].bonus_points.points,
        });
        if (resLeaderboard.error) throw resLeaderboard.error;
      } else {
        const resLeaderboard = await this.client
          .from('leaderboard')
          .update({
            bonus_points:
              res.data[0].bonus_points.points +
              userLeaderboardMatches.data[0].bonus_points,
          })
          .eq('user_id', userId);
        if (resLeaderboard.error) throw resLeaderboard.error;
      }
    }
  }
}
