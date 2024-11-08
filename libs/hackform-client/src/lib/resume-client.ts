import { injectable, container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { StorageError } from '@supabase/storage-js';

interface ResumeResponse {
  path: string;
  success: boolean;
}

@injectable()
export class HackformResumeUploadClient {
  private readonly supabaseClient: HibiscusSupabaseClient;
  private readonly bucket: string = 'resume';

  constructor() {
    this.supabaseClient = container.resolve(HibiscusSupabaseClient);
  }

  /**
   * Upload hacker resume file with given key
   * @param buf bytes Buffer object data representing the hacker resume's upload
   * @param userId userId of user that is uploading the resume
   * @returns ResumeResponse object containing the path of the uploaded resume and a boolean indicating success
   */
  async uploadResume(buf: Buffer, userId: string): Promise<ResumeResponse> {
    const blob = new Blob([buf], { type: 'application/pdf' });
    const { data, error } = await this.supabaseClient
      .getClient()
      .storage.from(this.bucket)
      .upload(`${userId}/resume.pdf`, blob);
    if (error) {
      throw new StorageError(error.message);
    }

    return {
      path: data.path,
      success: true,
    };
  }

  /**
   * Update hacker resume file with given key
   * @param buf bytes Buffer object data representing the hacker resume's upload
   * @param userId userId of user that is uploading the resume
   * @returns ResumeResponse object containing the path of the uploaded resume and a boolean indicating success
   */
  async updateResume(buf: Buffer, userId: string): Promise<ResumeResponse> {
    const blob = new Blob([buf], { type: 'application/pdf' });
    const { data, error } = await this.supabaseClient
      .getClient()
      .storage.from(this.bucket)
      .update(`${userId}/resume.pdf`, blob);
    if (error) {
      throw new StorageError(error.message);
    }

    return {
      path: data.path,
      success: true,
    };
  }

  /**
   * Check if a resume exists for a given user
   * @param userId userId of user to check for resume
   * @returns boolean indicating if a resume exists for the given user
   */
  async resumeExists(userId: string): Promise<boolean> {
    const { data, error } = await this.supabaseClient
      .getClient()
      .storage.from(this.bucket)
      .list(`${userId}/`);

    if (error) {
      throw new StorageError(error.message);
    }

    return data.length > 0;
  }

  async getResumeUrl(userId: string): Promise<string> {
    const { data } = await this.supabaseClient
      .getClient()
      .storage.from(this.bucket)
      .getPublicUrl(`${userId}/resume.pdf`);

    return data.publicUrl;
  }
}
