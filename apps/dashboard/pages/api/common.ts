import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handle(req, res) {
  //query for all team information
  const { data, error } = await supabase.from('user_profiles').select();
  console.log(supabaseUrl);
  console.log(supabaseKey);
  if (error !== null) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(200).json(data);
  }
}

//TODO: fix to add team info with user info
