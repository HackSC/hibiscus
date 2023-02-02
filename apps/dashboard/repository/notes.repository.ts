import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class NotesRepository {
  private readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL,
      process.env.HIBISCUS_SUPABASE_SERVICE_KEY
    );
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
