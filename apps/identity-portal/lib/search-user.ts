import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { setSessionClientSide } from '@hibiscus/sso-client';
import { container } from 'tsyringe';

export default async function searchUser(query: string): Promise<string[]> {
  const supabase = container.resolve(HibiscusSupabaseClient);
  await setSessionClientSide(supabase.getClient());

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
  const uniqueMatches = new Set(
    firstnameMatches.data.map((user) => user.user_id)
  );
  for (const match of lastnameMatches.data) {
    if (!uniqueMatches.has(match.user_id)) {
      uniqueMatches.add(match.user_id);
    }
  }

  return [...uniqueMatches];
}
