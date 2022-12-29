// polyfill
import 'reflect-metadata';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';
import axios from 'axios';
import {
  SSOApiResetResponseType,
  SSOApiSignInWithPassword,
  SSOApiSignUp,
  SSOApiUpdateUser,
  SSOApiVerifyOtp,
  SSOApiVerifyToken,
} from '@hacksc-platforms/types';

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
  static async resetPasswordViaEmail(email: string): SSOApiResetResponseType {
    const res = await axios.post(`/api/resetPasswordForEmail?email=${email}`);
    return res.data;
  }

  /**
   * Sign in user with email and password
   * @param email
   * @param password
   * @returns
   */
  static async signInWithPassword(
    email: string,
    password: string
  ): SSOApiSignInWithPassword {
    const res = await axios.post(
      `/api/signInWithPassword`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return res.data;
  }

  /**
   * Update user password
   * @param password
   * @returns
   */
  static async updatePassword(password: string): SSOApiUpdateUser {
    const res = await axios.post(`/api/updateUser`, {
      password,
    });
    return res.data;
  }

  /**
   * Sign up user with email and password
   * @param email
   * @param password
   * @returns
   */
  static async signUp(email: string, password: string): SSOApiSignUp {
    const res = await axios.post(`/api/signUp`, {
      email,
      password,
    });
    return res.data;
  }

  /**
   * Verifies a token given an email and type
   * @param email
   * @param token
   * @returns
   */
  static async verifyOtp(
    email: string,
    token: string,
    type: string
  ): SSOApiVerifyOtp {
    const res = await axios.post(`/api/verifyOtp`, {
      email,
      token,
      type,
    });
    return res.data;
  }

  /**
   * Verifies whether the provided access token is valid or has expired
   *
   * @param token JWT access token associated with a user
   * @returns object containing `data` and `error` properties, either of which may be undefined
   */
  static async verifyToken(token: string): SSOApiVerifyToken {
    const res = await axios.post(`${process.env.SSO_URL}/api/verifyToken`, {
      token,
    });
    return res.data;
  }

  /**
   * Validates the current session (stored in the cookies)
   *
   * @returns API reponse containing `data` object `{ token }`
   */
  static async validateSession() {
    return await axios.post('/api/validateSession', {});
  }
}
