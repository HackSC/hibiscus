// polyfill
import 'reflect-metadata';

import {
  createClient,
  EmailOtpType,
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
        data.session.access_token
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
   * @param token JWT access token associated with a user
   * @returns object containing `data` and `error` properties, either of which may be undefined
   */
  async verifyToken(token: string): SSOApiVerifyToken {
    const res = await this.client.auth.getUser(token);
    return res;
  }

  /**
   * Validates the current session (stored in localStorage)
   *
   * @returns `data` object `{ token }`
   */
  async validateSession(): Promise<{ token: string }> {
    const { data } = await this.client.auth.getSession();

    if (data.session != null) {
      return { token: data.session.access_token };
    }

    return null;
  }

  /**
   * Logs out of the current session
   */
  async logout() {
    deleteCookie(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME, { path: '/' });
    deleteCookie(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME, {
      path: '/',
      domain: process.env.NEXT_PUBLIC_HIBISCUS_DOMAIN,
    });

    await this.client.auth.signOut();
  }

  static setTokenCookieClientSide(token: string) {
    setCookie(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME, token, {
      path: '/',
      maxAge: Number.parseInt(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_MAX_AGE),
      sameSite: 'none',
      secure: true,
    });
    setCookie(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME, token, {
      path: '/',
      domain: process.env.NEXT_PUBLIC_HIBISCUS_DOMAIN,
      maxAge: Number.parseInt(process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_MAX_AGE),
      sameSite: 'none',
      secure: true,
    });
  }
}
