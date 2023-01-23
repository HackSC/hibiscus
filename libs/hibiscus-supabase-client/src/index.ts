// polyfill
import 'reflect-metadata';

import {
  createClient,
  EmailOtpType,
  SupabaseClient,
} from '@supabase/supabase-js';
import { injectable } from 'tsyringe';
import {
  Database,
  HibiscusRole,
  SSOApiResetResponseType,
  SSOApiSignInWithPassword,
  SSOApiSignUp,
  SSOApiUpdateUser,
  SSOApiVerifyOtp,
  SSOApiVerifyToken,
} from '@hibiscus/types';
import { deleteCookie, setCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';

@injectable()
export class HibiscusSupabaseClient {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL,
      process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_ANON_KEY
    );
  }

  getClient() {
    return this.client;
  }

  setOptions({ useServiceKey }: { useServiceKey: boolean }) {
    if (useServiceKey) {
      this.client = createClient(
        getEnv().Hibiscus.Supabase.apiUrl,
        getEnv().Hibiscus.Supabase.serviceKey
      );
    }
  }

  /**
   * Reset the password for this user (abstracts over supabase).
   * @param email email of the user
   */
  async resetPasswordViaEmail(
    email: string,
    resetCallbackUrl: string
  ): SSOApiResetResponseType {
    const res = await this.client.auth.resetPasswordForEmail(email, {
      redirectTo: resetCallbackUrl,
    });
    return res;
  }

  /**
   * Sign in user with email and password
   * @param email
   * @param password
   * @returns
   */
  async signInWithPassword(
    email: string,
    password: string
  ): SSOApiSignInWithPassword {
    const res = await this.client.auth.signInWithPassword({
      email,
      password,
    });
    const data = res.data;
    if (data.user) {
      HibiscusSupabaseClient.setTokenCookieClientSide(
        data.session.access_token,
        data.session.refresh_token
      );
    }
    return res;
  }

  /**
   * Update user password
   * @param password
   * @returns
   */
  async updatePassword(password: string): SSOApiUpdateUser {
    const res = await this.client.auth.updateUser({
      password,
    });
    return res;
  }

  /**
   * Sign up user with email and password
   * @param email
   * @param password
   * @returns
   */
  async signUp(email: string, password: string): SSOApiSignUp {
    const res = await this.client.auth.signUp({
      email,
      password,
    });
    return res;
  }

  /**
   * Verifies a token given an email and type
   * @param email
   * @param token
   * @returns
   */
  async verifyOtp(
    email: string,
    token: string,
    type: EmailOtpType
  ): SSOApiVerifyOtp {
    const res = await this.client.auth.verifyOtp({
      email,
      token,
      type,
    });
    return res;
  }

  /**
   * Verifies whether the provided access token is valid or has expired
   *
   * @param access_token JWT access token associated with a user
   * @param refresh_token Supabase refresh token
   * @returns object containing `data` and `error` properties, either of which may be undefined
   */
  async verifyToken(
    access_token: string,
    refresh_token: string
  ): SSOApiVerifyToken {
    // Refresh the access token if needed
    const data = await this.client.auth.setSession({
      access_token,
      refresh_token,
    });
    return data;
  }

  /**
   * Logs out of the current session
   */
  async logout() {
    deleteCookie(process.env.NEXT_PUBLIC_HIBISCUS_ACCESS_COOKIE_NAME, {
      path: '/',
      domain: process.env.NEXT_PUBLIC_HIBISCUS_DOMAIN,
    });
    deleteCookie(process.env.NEXT_PUBLIC_HIBISCUS_REFRESH_COOKIE_NAME, {
      path: '/',
      domain: process.env.NEXT_PUBLIC_HIBISCUS_DOMAIN,
    });

    await this.client.auth.signOut();
  }

  /**
   * Retrives the profile of the current logged-in user
   *
   * @param access_token
   * @param refresh_token
   * @returns nullable Promise containing UserProfile object
   */
  async getUserProfile(
    access_token: string,
    refresh_token: string
  ): Promise<UserProfileRow | null> {
    const authRes = await this.verifyToken(access_token, refresh_token);
    if ('session' in authRes.data && authRes.data.session != null) {
      // Access token was refreshed, update cookies
      HibiscusSupabaseClient.setTokenCookieClientSide(
        authRes.data.session.access_token,
        authRes.data.session.refresh_token
      );
    }

    const user = authRes.data.user;
    if (user == null) {
      // Access token was invalid
      return null;
    }

    const dbRes = await this.client
      .from('user_profiles')
      .select()
      .eq('user_id', user.id);

    if (dbRes.data.length !== 1) {
      // User either not found or duplicates found == DB corrupted
      return null;
    }

    return dbRes.data[0] as UserProfileRow;
  }

  /**
   * Creates row in the user_profiles table.
   * This must be run immediately after the user's email is verified, and before cookies are set
   *
   * @param firstname
   * @param lastname
   * @param access_token
   * @param refresh_token
   */
  async createUserProfile(
    firstname: string,
    lastname: string,
    access_token: string,
    refresh_token: string
  ) {
    const authRes = await this.verifyToken(access_token, refresh_token);
    const user = authRes.data.user;
    if (user == null) {
      // Access token was invalid
      throw Error('Invalid session');
    }

    await this.client.from('user_profiles').insert({
      user_id: user.id,
      email: user.email,
      first_name: firstname,
      last_name: lastname,
      // Default role = HACKER
      role: Object.keys(HibiscusRole).indexOf(HibiscusRole.HACKER) + 1,
    });
  }

  /**
   * Updates user under this user ID
   * @param userId user ID
   * @param update update schema
   * @returns nothing if no error else {message, code}
   */
  async updateUserProfile(userId: string, update: UserProfileUpdate) {
    const { error } = await this.client
      .from('user_profiles')
      .update(update)
      .eq('user_id', userId);
    if (error) {
      console.error(error);
      return { message: error.message, code: error.code };
    }
  }

  async userApplied(userId: string): Promise<{
    error?: { message: string; code: string };
    data?: { applied: boolean };
  }> {
    const { data, error } = await this.client
      .from('user_profiles')
      .select('app_id')
      .eq('user_id', userId);
    if (error) {
      console.error(error);
      return { error: { message: error.message, code: error.code } };
    }
    if (data.length === 0) {
      return {
        error: { message: 'Could not find user', code: 'UserNotFound' },
      };
    }
    const applied = data[0].app_id !== null;
    return { data: { applied } };
  }

  static setTokenCookieClientSide(access_token: string, refresh_token: string) {
    setCookie(
      process.env.NEXT_PUBLIC_HIBISCUS_ACCESS_COOKIE_NAME,
      access_token,
      {
        path: '/',
        domain: process.env.NEXT_PUBLIC_HIBISCUS_DOMAIN,
        maxAge: Number.parseInt(
          process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_MAX_AGE
        ),
        sameSite: 'lax',
      }
    );
    setCookie(
      process.env.NEXT_PUBLIC_HIBISCUS_REFRESH_COOKIE_NAME,
      refresh_token,
      {
        path: '/',
        domain: process.env.NEXT_PUBLIC_HIBISCUS_DOMAIN,
        maxAge: Number.parseInt(
          process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_MAX_AGE
        ),
        sameSite: 'lax',
      }
    );
  }
}

type UserProfileRow = Database['public']['Tables']['user_profiles']['Row'];
type UserProfileInsert =
  Database['public']['Tables']['user_profiles']['Insert'];
type UserProfileUpdate =
  Database['public']['Tables']['user_profiles']['Update'];
