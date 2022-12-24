import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://anzqbrsbjgqaphrfiaqv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function request(req, res) {}

async function inviteeAccept(req, res) {}

async function inviteeDeny(req, res) {}

export { request, inviteeAccept, inviteeDeny };
