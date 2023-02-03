import {
  HibiscusSupabaseClient,
  UserProfileRow,
} from '@hibiscus/hibiscus-supabase-client';
import { container } from 'tsyringe';
import { parseDoB } from './parse-dob';

export default async function searchUser(query: string): Promise<any[]> {
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

  // Add DoB
  for (let i = 0; i < uniqueMatches.length; i++) {
    const userId = uniqueMatches[i].user_id;
    const res = await supabase
      .getClient()
      .from('participants')
      .select()
      .eq('id', userId);
    if (res.data.length > 0) {
      uniqueMatches[i].dob = parseDoB(res.data[0].dob);
    }
  }

  return uniqueMatches;
}
