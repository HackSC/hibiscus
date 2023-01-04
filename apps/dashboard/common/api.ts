import axios from 'axios';
import { v4 } from 'uuid';
import { LocalAPIResponses } from './types';

export default class API {
  static async submitResume(file: File) {
    const key = v4();
    const res = await axios.post('/api/resume', { file, key });
    const data = res.data as LocalAPIResponses['/resume'];
    return data;
  }
}
