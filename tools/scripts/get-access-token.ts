import dotenv from 'dotenv';
dotenv.config();

import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

const INSTRUCTIONS = `
  Usage:
  npx ts-node path/to/script.ts email password
`;

if (process.argv.length < 4) {
  console.log(INSTRUCTIONS);
}

const email = process.argv[2];
const password = process.argv[3];

async function login(): Promise<Session | null> {
  const supabase = createSupabaseServiceClient();
  const {
    data: { session },
  } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return session;
}

function createSupabaseServiceClient(): SupabaseClient {
  const apiUrl = process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL;
  const serviceKey = process.env.HIBISCUS_SUPABASE_SERVICE_KEY;
  if (apiUrl == null || serviceKey == null) {
    throw new Error(
      'Supabase API URL or service key not defined in environment variables'
    );
  }

  return createClient(apiUrl ?? '', serviceKey ?? '');
}

(async () => {
  const session = await login();
  if (session != null) {
    console.log('User logged in:');
    console.log(session);
  } else {
    console.error('Failed to log in');
  }
  process.exit();
})();
