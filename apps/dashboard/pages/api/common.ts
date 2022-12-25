import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'http://localhost:54321';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handle(req, res) {
  //query for all team information
  const { data, error } = await supabase.from('user_profiles').select();

  if (error !== null) {
    res.response(500).json({ message: error.message });
  } else {
    res.status(200).json(data);
  }
}
