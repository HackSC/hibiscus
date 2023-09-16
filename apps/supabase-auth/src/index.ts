import { Hono } from 'hono';
import { createClient } from '@supabase/supabase-js';

const app = new Hono();

app.get('/me/:access_token', async (c) => {
  const supabasePublicKey = 'placeholder';
  const supabaseUrl = 'placeholder';
  const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: false, // True by default, express needs set to false to work
    },
  };
  const supabase = await createClient(supabaseUrl, supabasePublicKey, options);

  const access_token = c.req.param('access_token');
  const getUserResponse = await supabase.auth.getUser(access_token);
  const user_id = getUserResponse.data.user?.id;
  const { data: userData } = await supabase
    .from('user_profiles')
    .select()
    .eq('user_id', user_id);

  return c.json(userData);
});

export default app;
