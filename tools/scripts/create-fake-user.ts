import dotenv from 'dotenv';
dotenv.config();

import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { getEnv } from '../../libs/env/src';
import { HibiscusRole } from '../../libs/types/src';

const FAKE_USER_EMAIL = 'example@hacksc.com';
const FAKE_USER_PASSWORD = 'hacksc';

async function createFakeUser(): Promise<User | null> {
  const supabase = createSupabaseServiceClient();
  const {
    data: { user },
  } = await supabase.auth.admin.createUser({
    email: FAKE_USER_EMAIL,
    password: FAKE_USER_PASSWORD,
    email_confirm: true,
  });

  if (user != null) {
    await supabase.from('user_profiles').insert({
      user_id: user.id,
      email: user.email,
      first_name: 'Hack',
      last_name: 'SC',
      // Default role = HACKER
      role: Object.keys(HibiscusRole).indexOf(HibiscusRole.HACKER) + 1,
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
  const user = await createFakeUser();
  if (user != null) {
    console.log('Fake user created:');
    console.log(user);
  } else {
    console.error('Failed to create fake user; check if user already exists');
  }
})();
