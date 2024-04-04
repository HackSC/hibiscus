import dotenv from 'dotenv';
dotenv.config();

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from '../../libs/env/src';
import { MongoClient } from 'mongodb';

const USERS = ['REDACTED'];
const STATUS = 5;

async function setApplicationStatus(
  userIds: string[],
  applicationStatus: number
) {
  const supabase = createSupabaseServiceClient();

  const res = await supabase
    .from('user_profiles')
    .update({
      application_status: applicationStatus,
      application_status_last_changed: new Date(),
    })
    .in('user_id', userIds)
    .select();

  if (res.error) {
    console.log(res.error.message);
  } else {
    console.log(`Supabase success! ${res.data.length} entries updated`);
  }

  const mongo = new MongoClient(getEnv().Hibiscus.FeatureFlag.MongoURI ?? '');
  const mongoRes = await mongo
    .db('hacksc-f23')
    .collection('applications')
    .updateMany(
      {
        fields: {
          $elemMatch: {
            key: 'question_QKvpL7_bbb4c226-1b36-4bf8-add1-2378b7e69e4d',
            value: { $in: userIds },
          },
        },
      },
      { $set: { applicationStatus } }
    );

  if (!mongoRes.acknowledged) {
    console.log('MongoDB transaction not acknolwedged');
  } else {
    console.log(`MongoDB success! ${mongoRes.modifiedCount} entries updated`);
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
  await setApplicationStatus(USERS, STATUS);
  process.exit();
})();
