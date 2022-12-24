import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://anzqbrsbjgqaphrfiaqv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function list(req, res) {}

export { list };
