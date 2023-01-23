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
    return null;
  }
}
