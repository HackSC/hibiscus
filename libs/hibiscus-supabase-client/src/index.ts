// polyfill
import 'reflect-metadata';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class HibiscusSupabaseClient {
  private readonly client: SupabaseClient;
  public readonly MAX_TEAM_MEMBERS: number = parseInt(
    process.env.MAX_TEAM_MEMBERS
  );
  constructor() {
    this.client = createClient(
      process.env.SUPABASE_API_URL,
      process.env.SUPABASE_ANON_KEY
    );
  }

  getClient() {
    return this.client;
  }
}
