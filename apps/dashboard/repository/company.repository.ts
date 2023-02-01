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
}
