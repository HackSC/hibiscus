import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class EventsAPI {
  private client: SupabaseClient;
  constructor(hbc: HibiscusSupabaseClient) {
    this.client = hbc.getClient();
  }

  async getPinnedEvents(userId: string, day: number) {
    const { data, error } = await this.client
      .from('pinned_events')
      .select('events(id,name,start,end,location,points)');
    return { data, error };
  }

  async getAllEvents(day: number) {
    const { data, error } = await this.client
      .from('events')
      .select('id,name,start,end,location,points')
      .order('start');
    return { data, error };
  }
}
