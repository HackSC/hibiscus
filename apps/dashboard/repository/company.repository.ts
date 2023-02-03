import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';
import { injectable } from 'tsyringe';

interface GetCompanyParticipantsFilter {
  saved?: boolean;
}

@injectable()
export class CompanyRepository {
  private client: SupabaseClient;
  private readonly savedParticipantsTableName: string =
    'companies_saved_user_profiles';
  constructor(private readonly hbc: HibiscusSupabaseClient) {
    hbc.setOptions({ useServiceKey: true });
    this.client = hbc.getClient();
  }

  async getCompanyParticipants(
    companyId: string,
    { saved }: GetCompanyParticipantsFilter
  ) {
    const res = await this.client
      .from('event_log')
      .select('events(*), user_profiles(user_id, first_name, last_name)')
      .eq('events.company_id', companyId);
    const profiles = res.data[0].user_profiles;
    console.log(profiles);
    return;
  }

  async modifySaveStatusParticipant(
    companyId: string,
    participantId: string,
    saveStatus: boolean
  ) {
    const res = await this.client
      .from(this.savedParticipantsTableName)
      .update({ saved: saveStatus })
      .eq('company_id', companyId)
      .eq('participant_id', participantId);
    return res;
  }

  async getCompanyById(companyId: string) {
    const { data, error } = await this.client
      .from('companies')
      .select(
        `
      id,
      name,
      description,
      website,
      profile_photo,
      target_graduations (
        graduation_year
      ),
      target_majors (
        major
      )
    `
      )
      .eq('id', companyId)
      .single();

    return { data, error };
  }

  async insertAttendeeIntoSaved(participantId: string, companyId: string) {
    if (await this.checkSavedAttendeeAlreadyExists(participantId, companyId)) {
      throw new Error('User already saved. Cannot save twice.');
    }

    const { data, error } = await this.client
      .from('company_saved_participants')
      .insert({ user_id: participantId, company_id: companyId, saved: true })
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
      );

    return { data, error };
  }

  async deleteAttendeeFromSaved(participantId: string, companyId: string) {
    const { data, error } = await this.client
      .from('company_saved_participants')
      .delete()
      .eq('user_id', participantId)
      .eq('company_id', companyId)
      .select();

    if (error) console.log(error.message);
    if (!data.length) throw new Error("Entry didn't exist");

    return { data, error };
  }

  async checkSavedAttendeeAlreadyExists(
    participantId: string,
    companyId: string
  ) {
    const { data, error } = await this.client
      .from('company_saved_participants')
      .select()
      .eq('user_id', participantId)
      .eq('company_id', companyId);

    if (error) console.log(`Save Error: ${error.message}`);

    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
