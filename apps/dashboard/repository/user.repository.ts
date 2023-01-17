import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository {
  private client: SupabaseClient;
  constructor(private readonly hbc: HibiscusSupabaseClient) {
    hbc.setOptions({ useServiceKey: true });
    this.client = hbc.getClient();
  }

  async getUserIdByEmail(email: string) {
    return this.client
      .from('user_profiles')
      .select('user_id')
      .eq('email', email)
      .single();
  }
}
