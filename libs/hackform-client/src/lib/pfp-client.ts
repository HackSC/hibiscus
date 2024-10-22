import { injectable, container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { StorageError } from '@supabase/storage-js';

interface ProfilePictureResponse {
  path: string;
  success: boolean;
}

@injectable()
export class HackFromProfilePictureClient {
  private readonly supabaseClient: HibiscusSupabaseClient;
  private readonly bucket: string = 'profile-pictures';

  constructor() {
    this.supabaseClient = container.resolve(HibiscusSupabaseClient);
  }

  public async uploadPfp(
    userId: string,
    file: Buffer,
    mimeType: string
  ): Promise<ProfilePictureResponse> {
    const blob = new Blob([file], { type: mimeType });
    const { data, error } = await this.supabaseClient
      .getClient()
      .storage.from(this.bucket)
      .upload(`${userId}/pfp.${mimeType.split("/")[1]}`, blob);
    if (error) {
      throw new StorageError(error.message);
    }

    return {
      path: data.path,
      success: true,
    };
  }

  public async updatePfp(
    userId: string,
    file: Buffer,
    mimeType: string
  ): Promise<ProfilePictureResponse> {
    const blob = new Blob([file], { type: mimeType });
    const { data, error } = await this.supabaseClient
      .getClient()
      .storage.from(this.bucket)
      .update(`${userId}/pfp.${mimeType.split("/")[1]}`, blob);
    if (error) {
      throw new StorageError(error.message);
    }

    return {
      path: data.path,
      success: true,
    };
  }

  public async pfpExists(userId: string): Promise<boolean> {
    const { data, error } = await this.supabaseClient
      .getClient()
      .storage.from(this.bucket)
      .list(`${userId}/`);

    if (error) {
      console.log(error);
      throw new StorageError(error.message);
    }

    return data.length > 0;
  }
}
