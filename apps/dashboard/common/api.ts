import { HackformSubmission } from '@hibiscus/types';
import axios from 'axios';
import { LocalAPIResponses } from './types';

export default class API {
  static createFileKey(file: File): string {
    const sfn = file.name.split('.');
    const ext = sfn[sfn.length - 1];
    const name = sfn[0];
    return `${name}-${new Date().valueOf()}.${ext}`;
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
   * @param submission HackformSubmission
   * @returns whatever it returns
   */
  static async submitHackform(submission: HackformSubmission) {
    const res = await axios.post('/api/hackform', { submission });
    return res.data;
  }

  static async getHackformSubmission(id: string) {
    const res = await axios.get(`/api/hackform?id=${id}`);
    return res.data;
  }
}
