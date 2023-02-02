import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class NotesRepository {
  private client: SupabaseClient;

  constructor(private readonly hbc: HibiscusSupabaseClient) {
    hbc.setOptions({ useServiceKey: true });
    this.client = hbc.getClient();
  }

  getClient() {
    return this.client;
  }

  async getNoteByCompanyAndParticipantId(
    companyId: string,
    participantId: string
  ) {
    const { data, error } = await this.client
      .from('notes')
      .select()
      .eq('company_id', companyId)
      .eq('participant_id', participantId)
      .single();

    if (error) console.log(`Supabase Error: ${error.message}`);
    return { data, error };
  }

  async insertNote(companyId: string, participantId: string, note: string) {
    const { data, error } = await this.client
      .from('notes')
      .insert({
        company_id: companyId,
        participant_id: participantId,
        note: note,
      })
      .select()
      .single();

    if (error) console.log(`Supabase Error: ${error.message}`);
    return { data, error };
  }

  async updateNote(companyId: string, participantId: string, note: string) {
    const { data, error } = await this.client
      .from('notes')
      .update({ note: note })
      .eq('company_id', companyId)
      .eq('participant_id', participantId)
      .select()
      .single();

    if (error) console.log(`Supabase Error: ${error.message}`);
    return { data, error };
  }
}
