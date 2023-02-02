import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';

export default async function searchEventId(
  query: number,
  supabase: HibiscusSupabaseClient
): Promise<string> {
  const eventnameMatches = await supabase
    .getClient()
    .from('events')
    .select()
    .eq('id', `${query}`);

  console.log(eventnameMatches.data[0].name);
  try {
    return eventnameMatches.data[0].name;
  } catch {
    throw new Error('Event not found');
  }
}
