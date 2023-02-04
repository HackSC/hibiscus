import dotenv from 'dotenv';
dotenv.config();

import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { getEnv } from '../../libs/env/src';
import { faker } from '@faker-js/faker';

const INSTRUCTIONS = `
  Usage:
  npx ts-node path/to/script.ts
`;

async function putBonusPoints() {
  const supabase = createSupabaseServiceClient();
  const BONUS_POINTS = [
    {
      name: 'Follow us on Instagram!',
      description: '',
      points: 25,
      link: faker.internet.url(),
    },
    {
      name: 'Follow us on Facebook!',
      description: '',
      points: 25,
      link: faker.internet.url(),
    },
    {
      name: 'Follow us on Twitter!',
      description: '',
      points: 25,
      link: faker.internet.url(),
    },
    {
      name: 'Post on social media with the hashtag #hacksc23',
      description: '',
      points: 25,
      id: faker.datatype.uuid(),
    },
  ];
  for (const bp of BONUS_POINTS) {
    await supabase.from('bonus_points').insert(bp);
  }
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
  await putBonusPoints();
  process.exit();
})();
