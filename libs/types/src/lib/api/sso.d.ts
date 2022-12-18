import { GoTrueClient } from '@supabase/supabase-js';

export type SSOApiResetResponseType = ReturnType<
  GoTrueClient['resetPasswordForEmail']
>;
export type SSOApiSignInWithPassword = ReturnType<
  GoTrueClient['signInWithPassword']
>;
export type SSOApiSignUp = ReturnType<GoTrueClient['signUp']>;
