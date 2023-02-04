import dotenv from 'dotenv';
dotenv.config();

import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { getEnv } from '../../libs/env/src';

const INSTRUCTIONS = `
  Usage:
  npx ts-node path/to/script.ts email password firstname lastname [role as int]
`;

if (process.argv.length < 6) {
  console.log(INSTRUCTIONS);
}

const email = process.argv[2];
const password = process.argv[3];
const first_name = process.argv[4];
const last_name = process.argv[5];
const role = process.argv[6] ?? 5; // Default: HACKER
const bonus_points = process.argv[7];
const event_points = process.argv[7];

async function createUser(): Promise<User | null> {
  const supabase = createSupabaseServiceClient();
  const {
    data: { user },
  } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
  });

  if (user != null) {
    await supabase.from('user_profiles').insert({
      user_id: user.id,
      email: user.email,
      first_name,
      last_name,
      role,
    });
    await supabase.from('leaderboard').insert({
      user_id: user.id,
      bonus_points: bonus_points,
      event_points: event_points,
    });
  }

  return user;
}

function createSupabaseServiceClient(): SupabaseClient {
  const env = getEnv();
  if (
    env.Hibiscus.Supabase.apiUrl == null ||
    env.Hibiscus.Supabase.serviceKey == null
  ) {
    throw new Error(
      'Supabase API URL or service key not defined in environment variables'
    );
  }

  return createClient(
    getEnv().Hibiscus.Supabase.apiUrl ?? '',
    getEnv().Hibiscus.Supabase.serviceKey ?? ''
  );
}

(async () => {
  const user = await createUser();
  if (user != null) {
    console.log('User created:');
    console.log(user);
  } else {
    console.error('Failed to create user; check if user already exists');
  }
  process.exit();
})();
