import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { injectable } from 'tsyringe';

@injectable()
export class LinkRepository {
  constructor(private readonly client: HibiscusSupabaseClient) {}

  /**
   * Update or inserts a path-URL pair
   * @param path
   * @param url
   * @returns id of the app
   */
  async upsertPathURL(
    path: string,
    url: string
  ): Promise<{ data?: number; error?: { message: string; code: string } }> {
    const supabase = this.client.getClient();
    const { data, error } = await supabase
      .from('pointr_shortlinks')
      .upsert({ url })
      .eq('path', path)
      .select('id');
    if (error) {
      return { error: { message: error.message, code: error.code } };
    }
    return { data: data[0].id };
  }

  async getURL(
    path: string
  ): Promise<{ data?: string; error?: { message: string; code: string } }> {
    const supabase = this.client.getClient();
    const { data, error } = await supabase
      .from('pointr_shortlinks')
      .select('url')
      .eq('path', path);
    if (error) {
      return { error: { message: error.message, code: error.code } };
    }
    if (data.length === 0) {
      return { error: { message: "Couldn't find path", code: 'PathNotFound' } };
    }
    return { data: data[0].url };
  }
}
