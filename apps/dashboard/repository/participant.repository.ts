import { injectable } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';

@injectable()
export class ParticipantRepository {
  private client: SupabaseClient;
  private tableName = 'participants';
  constructor(private readonly hbc: HibiscusSupabaseClient) {
    hbc.setOptions({ useServiceKey: true });
    this.client = hbc.getClient();
  }

  async getParticipantInfo(id: string) {
    const { data, error } = await this.client
      .from('participants')
      .select()
      .eq('id', id);

    return { data, error };
  }

  async insertNewParticipant(
    id: string,
    firstName: string,
    lastName: string,
    major: string,
    graduationYear: string,
    resume?: string,
    portfolioLink?: string
  ) {
    const { data, error } = await this.client
      .from('participants')
      .insert([
        {
          id: id,
          first_name: firstName,
          last_name: lastName,
          major: major,
          resume: resume,
          graduation_year: graduationYear,
          portfolio_link: portfolioLink,
        },
      ])
      .select()
      .single();

    return { data, error };
  }

  async updateParticipantResume(id: string, resume: string) {
    const { data, error } = await this.client
      .from('participants')
      .update({ resume: resume })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  async updateParticipantPortfolioLink(id: string, portfolioLink: string) {
    const { data, error } = await this.client
      .from('participants')
      .update({ portfolio_link: portfolioLink })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }
}
