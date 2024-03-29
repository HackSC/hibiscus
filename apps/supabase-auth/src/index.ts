import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { bearerAuth } from 'hono/bearer-auth';
import { createClient } from '@supabase/supabase-js';

export type Bindings = {
  SUPABASE_SERVICE_KEY: string;
  SUPABASE_URL: string;
  INVITE_REDIRECT_URL: string;
  MASTER_TOKEN: string;
};

const HTTP_BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/*', cors());

app.use('/api/invite/:role/:email', (c, next) =>
  bearerAuth({ token: c.env.MASTER_TOKEN })(c, next)
);
app.post('/api/invite/:role/:email', async (c) => {
  try {
    const supabase = createClient(
      c.env.SUPABASE_URL,
      c.env.SUPABASE_SERVICE_KEY
    );
    const role = parseInt(c.req.param('role'));
    const email = c.req.param('email');
    if (role === null || email === null || email === '') {
      return c.json(
        {
          error: 'PARAMETER_ERROR',
          message: 'missing required parameters',
        },
        INTERNAL_SERVER_ERROR
      );
    }
    // role should be between 1 and 7
    // maybe we shouldn't hardcode this, but I'm not sure how to change this for now
    if (role > 0 && role < 8) {
      const result = await supabase.from('user_invites').insert({
        role: role,
        email: email,
      });
      await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: c.env.INVITE_REDIRECT_URL,
      });
      return c.json({ message: 'Success!' }, 200);
    } else {
      return c.json(
        {
          error: 'PARAMETER_ERROR',
          message: 'Role number not recognized should be between 1 and 7',
        },
        INTERNAL_SERVER_ERROR
      );
    }
  } catch (e) {
    console.log(e);
    return c.json(
      {
        error: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred.',
      },
      INTERNAL_SERVER_ERROR
    );
  }
});

app.get('/api/verify-token/:access_token', async (c) => {
  try {
    const supabase = createClient(
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
        HTTP_BAD_REQUEST
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
      .select('*, role (name)')
      .eq('user_id', user_id);
    if (userError) {
      return c.json(
        {
          error: 'USER_RETRIEVAL_FAILURE',
          message:
            'User data could not be retrieved from Supabase: ' +
            userError?.message,
        },
        INTERNAL_SERVER_ERROR
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

    return c.json({ ...userData[0], role: userData[0].role.name }, 200);
  } catch (e) {
    return c.json(
      {
        error: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred.',
      },
      INTERNAL_SERVER_ERROR
    );
  }
});

export default app;
