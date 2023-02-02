import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

@injectable()
export class AttendeeRepository {
  private client: SupabaseClient;

  constructor(private readonly hbc: HibiscusSupabaseClient) {
    hbc.setOptions({ useServiceKey: true });
    this.client = hbc.getClient();
  }
  getClient() {
    return this.client;
  }

  async getEventsByCompanyId(companyId: string) {
    const { data, error } = await this.client
      .from('events')
      .select()
      .eq('company_id', companyId);

    if (error) throw new Error(error.message);
    return { data, error };
  }

  async getEventInfo(eventId: string) {
    const { data, error } = await this.client
      .from('events')
      .select()
      .eq('id', eventId)
      .single();

    if (error) throw new Error(error.message);
    return { data, error };
  }

  async getAttendeesByEventId(eventId: string) {
    const { data, error } = await this.client
      .from('event_log')
      .select(
        `
        participants(
          id,
          user_profiles(
            first_name,
            last_name
          ),
          notes(
            note,
            company_id
          ),
          major,
          resume,
          graduation_year,
          portfolio_link,
          school
        )
      `
      )
      .eq('event_id', eventId);

    if (error) throw new Error(error.message);
    return { data, error };
  }
}
