import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class EventRepository {
  private client: SupabaseClient;

  constructor(private readonly hbc: HibiscusSupabaseClient) {
    hbc.setOptions({ useServiceKey: true });
    this.client = hbc.getClient();
  }
  getClient() {
    return this.client;
  }
  async getEvent(event_id: string) {
    const { data, error } = await this.client
      .from('events')
      .select('*')
      .eq('id', event_id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
  async getEventAdmin(event_id: string) {
    return -1;
  }

  async getEvents(
    page: number = null,
    page_size: number = null,
    date?: Date,
    after?: Date,
    name?: string,
    location?: string
  ) {
    return -1;
  }

  async addEvent(event: any) {
    return -1;
  }

  async updateEvent(
    event_id: string,
    event_tags?: string[],
    industry_tags?: string[]
  ) {
    //TODO: Add kwargs
    return -1;
  }

  async deleteEvent(event_id: string) {
    return -1;
  }

  async getPinnedEvents(user_id: string) {
    return -1;
  }

  async addPinnedEvent(user_id: string, event_id: string) {
    return -1;
  }

  async removePinnedEvent(user_id: string, event_id: string) {
    return -1;
  }

  async getRSVPUsers(event_id: string) {
    return -1;
  }

  async addEventTag(event_id: string, event_tag: string) {
    return -1;
  }

  async removeEventTag(event_id: string, event_tag: string) {
    return -1;
  }

  async addIndustryTag(event_id: string, industry_tag: string) {
    return -1;
  }

  async removeIndustryTag(event_id: string, industry_tag: string) {
    return -1;
  }

  async addContact(
    event_id: string,
    name: string,
    role?: string,
    phone?: string,
    email?: string
  ) {
    return -1;
  }

  async removeContact(contact_id: string) {
    return -1;
  }
}
