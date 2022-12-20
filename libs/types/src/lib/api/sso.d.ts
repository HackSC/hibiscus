import { GoTrueClient } from '@supabase/supabase-js';

export type SSOApiResetResponseType = ReturnType<
  GoTrueClient['resetPasswordForEmail']
>;
export type SSOApiSignInWithPassword = ReturnType<
  GoTrueClient['signInWithPassword']
>;
export type SSOApiUpdatePassword = ReturnType<GoTrueClient['updatePassword']>;
export type SSOApiSignUp = ReturnType<GoTrueClient['signUp']>;
export type SSOApiVerifyOtp = ReturnType<GoTrueClient['verifyOtp']>;
