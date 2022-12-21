// polyfill
import 'reflect-metadata';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';
import axios from 'axios';
import {
  SSOApiResetResponseType,
  SSOApiSignInWithPassword,
} from '@hacksc-platforms/types';

@injectable()
export class HibiscusSupabaseClient {
  private readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.HIBISCUS_SUPABASE_API_URL,
      process.env.HIBISCUS_SUPABASE_ANON_KEY
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
}
