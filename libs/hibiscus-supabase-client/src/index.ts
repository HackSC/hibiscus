// polyfill
import 'reflect-metadata';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { injectable } from 'tsyringe';

config({
  path: '.supabase.env',
});

@injectable()
export class HibiscusSupabaseClient {
  private readonly client: SupabaseClient;

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