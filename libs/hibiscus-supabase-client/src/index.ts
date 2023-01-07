// polyfill
import 'reflect-metadata';

import {
  createClient,
  EmailOtpType,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { injectable } from 'tsyringe';
import {
  SSOApiResetResponseType,
  SSOApiSignInWithPassword,
  SSOApiSignUp,
  SSOApiUpdateUser,
  SSOApiVerifyOtp,
  SSOApiVerifyToken,
} from '@hibiscus/types';
import { deleteCookie, setCookie } from 'cookies-next';

@injectable()
export class HibiscusSupabaseClient {
  private readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL,
      process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_ANON_KEY
    );
  }

  getClient() {
    return this.client;
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
   * Validates the current session (stored in localStorage)
   *
   * @returns `Session` object
   */
  async validateSession(): Promise<Session> {
    const { data } = await this.client.auth.getSession();

    if (data.session != null) {
      return data.session;
    }

    return null;
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

  async getUserProfile(
    access_token: string,
    refresh_token: string
  ): Promise<UserProfile | null> {
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

    return dbRes.data[0] as UserProfile;
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

interface UserProfile {
  created_at: string;
  first_name: string;
  last_name: string;
  user_id: string;
  role: number;
  team_id: number;
}
