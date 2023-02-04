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
  async upsertBonusPointsLog(
    userId: string,
    bonusPointsId: string,
    status: -1 | 0 | 1
  ) {
    const { data, error } = await this.client
      .from('bonus_points_log')
      .upsert({ user_id: userId, bonus_points_id: bonusPointsId, status });
    if (error) throw error;
    return data;
  }

  // get the most recent log for the user
  async getMostRecentBonusPointsLogUser(userId: string): Promise<
    {
      id: string;
      name: string;
      description: string;
      start: Date;
      end: Date;
      points: number;
      status: number;
    }[]
  > {
    const { data, error } = await this.client
      .from('bonus_points_log')
      .select('bonus_points(id,name,description,start,end,points), status')
      .eq('user_id', userId);
    if (error) throw error;
    return data.map((item) => {
      return {
        id: item.bonus_points[0].id,
        name: item.bonus_points[0].name,
        description: item.bonus_points[0].description,
        start: new Date(item.bonus_points[0].start),
        end: new Date(item.bonus_points[0].end),
        points: item.bonus_points[0].points,
        status: item.status,
      };
    });
  }
}
