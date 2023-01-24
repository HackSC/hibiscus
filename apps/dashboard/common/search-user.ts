import {
  HibiscusSupabaseClient,
  UserProfileRow,
} from '@hibiscus/hibiscus-supabase-client';
import { Database } from '@hibiscus/types';
import { container } from 'tsyringe';

export default async function searchUser(
  query: string
): Promise<UserProfileRow[]> {
  const supabase = container.resolve(HibiscusSupabaseClient);
  await supabase.setSessionClientSide();

  const firstnameMatches = await supabase
    .getClient()
    .from('user_profiles')
    .select()
    .textSearch('first_name', `'${query}'`);
  const lastnameMatches = await supabase
    .getClient()
    .from('user_profiles')
    .select()
    .textSearch('last_name', `'${query}'`);

  // Merge the results of both queries
  const uniqueMatchIds = new Set(
    firstnameMatches.data.map((match) => match.user_id)
  );
  const uniqueMatches = [...firstnameMatches.data];
  for (const match of lastnameMatches.data) {
    if (!uniqueMatchIds.has(match.user_id)) {
      uniqueMatchIds.add(match.user_id);
      uniqueMatches.push(match);
    }
  }

  return uniqueMatches as Database['public']['Tables']['user_profiles']['Row'][];
}
