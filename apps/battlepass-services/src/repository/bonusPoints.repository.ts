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
}
