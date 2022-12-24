import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://anzqbrsbjgqaphrfiaqv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createTeam(req, res) {}

async function invite(req, res) {}

async function inviterApprove(req, res) {}

async function inviterDeny(req, res) {}

export { createTeam, invite, inviterApprove, inviterDeny };
