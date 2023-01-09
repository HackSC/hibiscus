import {
  AuthResponse,
  GoTrueClient,
  UserResponse,
} from '@supabase/supabase-js';

export type SSOApiResetResponseType = ReturnType<
  GoTrueClient['resetPasswordForEmail']
>;
export type SSOApiSignInWithPassword = ReturnType<
  GoTrueClient['signInWithPassword']
>;
export type SSOApiUpdateUser = ReturnType<GoTrueClient['updateUser']>;
export type SSOApiSignUp = ReturnType<GoTrueClient['signUp']>;
export type SSOApiVerifyOtp = ReturnType<GoTrueClient['verifyOtp']>;
export type SSOApiVerifyToken = Promise<UserResponse | AuthResponse>;
