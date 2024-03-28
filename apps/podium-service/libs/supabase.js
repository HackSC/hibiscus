import { createClient } from '@supabase/supabase-js';
import { getEnv } from '@hibiscus/env';


const url = getEnv().Hibiscus.Supabase.apiUrl;
const key = getEnv().Hibiscus.Supabase.serviceKey;

export const supabase = createClient(
  url, 
  key, 
  { db: { schema: 'podium' }, });