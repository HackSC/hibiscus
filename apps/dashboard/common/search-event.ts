import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';

export default async function searchEvent(
  supabase: HibiscusSupabaseClient
): Promise<any[]> {
  const eventnameMatches = await supabase.getClient().from('events').select();

  return eventnameMatches.data;
}
