import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createClient } from '@supabase/supabase-js';

type Bindings = {
  SUPABASE_SERVICE_KEY: string;
  SUPABASE_URL: string;
};

const HTTP_BAD_REQUEST = 400;

const app = new Hono<{ Bindings: Bindings }>();
app.use('/api/*', cors());
app.get('api/verify_token/:access_token', async (c) => {
  try {
    const supabase = await createClient(
      c.env.SUPABASE_URL,
      c.env.SUPABASE_SERVICE_KEY
    );
    const access_token = c.req.param('access_token');
    const user = await supabase.auth.getUser(access_token);
    if (user.error) {
      return c.json(
        {
          error: 'INVALID_TOKEN',
          message: 'Invalid access token: ' + user.error.message,
        },
        user.error.status as number
      );
    }
    const user_id = user.data.user?.id;
    if (!user_id) {
      return c.json(
        {
          error: 'INVALID_USER_ID',
          message: 'Invalid user id.',
        },
        HTTP_BAD_REQUEST
      );
    }
    const { data: userData, error: userError } = await supabase
      .from('user_profiles')
      .select()
      .eq('user_id', user_id);
    if (userError) {
      return c.json(
        {
          error: 'USER_RETRIEVAL_FAILURE',
          message:
            'User data could not be retrieved from Supabase: ' +
            userError?.message,
        },
        HTTP_BAD_REQUEST
      );
    }
    if (userData?.length === 0) {
      return c.json(
        {
          error: 'USER_NOT_FOUND',
          message: 'No user data found for user id: ' + user_id,
        },
        HTTP_BAD_REQUEST
      );
    }
    return c.json(userData[0], 200);
  } catch {
    return c.json(
      {
        error: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred.',
      },
      HTTP_BAD_REQUEST
    );
  }
});

export default app;
