// polyfill
import 'reflect-metadata';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class HibiscusSupabaseClient {
  private readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_API_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  getClient() {
    return this.client;
  }
}
