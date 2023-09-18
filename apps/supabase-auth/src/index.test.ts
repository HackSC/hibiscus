import { createClient } from '@supabase/supabase-js';
import assert from 'assert';
import app, { Bindings } from '.';

describe('GET /api/verify-token', () => {
  test('Returns correct user object', async () => {
    assert(process.env.SUPABASE_URL !== undefined);
    assert(process.env.SUPABASE_SERVICE_KEY !== undefined);
    assert(process.env.TEST_SUPABASE_EMAIL !== undefined);
    assert(process.env.TEST_SUPABASE_PASSWORD !== undefined);

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Sign in to existing user
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: process.env.TEST_SUPABASE_EMAIL,
        password: process.env.TEST_SUPABASE_PASSWORD,
      });
    expect(authError).toBeNull();
    expect(authData.user).not.toBeNull();
    expect(authData.session).not.toBeNull();

    assert(authData.user !== null);
    assert(authData.session !== null);

    const token = authData.session.access_token;

    // Get user profile
    const { data: userData, error: userError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', authData.user.id);
    expect(userError).toBeNull();
    expect(userData).not.toBeNull();
    assert(userData !== null);
    expect(userData.length === 1);

    const user = userData[0];

    // Call endpoint
    const env: Bindings = {
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
    };
    const res = await app.fetch(
      new Request(`http://localhost/api/verify-token/${token}`),
      env
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(user);
  });

  test('Returns invalid token', async () => {
    assert(process.env.SUPABASE_URL !== undefined);
    assert(process.env.SUPABASE_SERVICE_KEY !== undefined);

    // Call endpoint
    const env: Bindings = {
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
    };
    const res = await app.fetch(
      new Request(`http://localhost/api/verify-token/blahblah`),
      env
    );
    expect(res.status).toBe(400);
    expect(await res.json()).toHaveProperty('error', 'INVALID_TOKEN');
  });
});
