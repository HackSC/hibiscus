import dotenv from 'dotenv';
dotenv.config();

import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { getEnv } from '../../libs/env/src';
import { faker } from '@faker-js/faker';

const INSTRUCTIONS = `
  Usage:
  npx ts-node path/to/script.ts email password firstname lastname [role as int]
`;

if (process.argv.length < 3) {
  console.log(INSTRUCTIONS);
}

async function createUser(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  role: number
): Promise<User | null> {
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
  }

  return user;
}

async function addToLeaderboard(
  user_id: string,
  bonus_points: number,
  event_points: number
) {
  const supabase = createSupabaseServiceClient();
  await supabase.from('leaderboard').insert({
    user_id: user_id,
    bonus_points: bonus_points,
    event_points: event_points,
  });
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
const num = Number.parseInt(process.argv[2]);
console.log(num);

(async () => {
  for (let i of Array.from(Array(num).keys())) {
    const email = faker.internet.email();
    const password = 'hacksc';
    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();
    const role = 5;
    const user = await createUser(email, password, first_name, last_name, role);
    if (user != null) {
      console.log('User created:');
      console.log(user);
      console.log('assigning user to leaderboard...');
      await addToLeaderboard(
        user.id,
        faker.datatype.number(200),
        faker.datatype.number(200)
      );
    } else {
      console.error('Failed to create user; check if user already exists');
    }
  }
  process.exit();
})();
