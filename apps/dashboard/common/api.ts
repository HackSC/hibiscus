import 'reflect-metadata';
import { HackformSubmission } from '@hibiscus/types';
import axios from 'axios';
import { LocalAPIResponses } from './types';
import mime from 'mime-types';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';

// a service wrapping over our API requests (intended for client-side usage ONLY
// since some interacts with Supabase on the client)
export default class APIService {
  static createFileKey(file: File): string {
    const sfn = file.name.split('.');
    const defext = mime.extension(file.type);
    const name = sfn[0];
    return `${name}-${new Date().valueOf()}.${defext}`;
  }

  /**
   * Submits resume to file storage. Uses a `UUID` for name by default
   *
   * @param file File object
   * @returns data from API response
   */
  static async submitResume(file: File, key: string) {
    const form = new FormData();
    form.append('file', file);
    form.append('key', key);
    const res = await axios.post('/api/resume', form);
    const data = res.data as LocalAPIResponses['/resume'];
    return { key, filepath: data.filepath, meta: data.meta };
  }

  /**
   * Submits data for hacker application
   * Also updates apps for the current user
   *
   * @param submission HackformSubmission
   * @param hackerId hacker ID
   * @returns whatever it returns
   */
  static async submitHackform(
    hackerId: string,
    submission: HackformSubmission
  ) {
    const res = await axios.post('/api/hackform', { submission });
    const data = res.data as LocalAPIResponses['/hackform'];
    const supabase = container.resolve(HibiscusSupabaseClient);
    // assoc current hacker with this form
    const env = getEnv();
    const user = await supabase.getUserProfile(
      getCookie(env.Hibiscus.Cookies.accessTokenName) as string,
      getCookie(env.Hibiscus.Cookies.refreshTokenName) as string
    );
    if (user.app_id) {
      console.error('User already has an app');
      return null;
    }
    const err = await supabase.updateUserProfile(hackerId, {
      app_id: data.formId,
    });
    if (err) {
      throw err;
    }
    return res.data;
  }

  static async getHackformSubmission(id: string) {
    const res = await axios.get(`/api/hackform?id=${id}`);
    return res.data;
  }

  static async getSchools(): Promise<string[]> {
    const res = await axios.get('/api/schools');
    return res.data as string[];
  }
}
