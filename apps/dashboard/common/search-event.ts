import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { Database } from '@hibiscus/types';
import { container } from 'tsyringe';

export default async function searchEvent(query: string): Promise<any[]> {
  //Database['public']['Tables']['events']['Row'][]
  const supabase = container.resolve(HibiscusSupabaseClient);
  await supabase.setSessionClientSide();

  const eventnameMatches = await supabase.getClient().from('events').select();
  const locMatches = await supabase
    .getClient()
    .from('events')
    .select()
    .textSearch('location', `'${query}'`);

  console.log(eventnameMatches);
  // Merge the results of both queries
  const uniqueMatchIds = new Set(
    eventnameMatches.data.map((match) => match.id)
  );
  const uniqueMatches = [...eventnameMatches.data];
  for (const match of locMatches.data) {
    if (!uniqueMatchIds.has(match.points)) {
      uniqueMatchIds.add(match.points);
      uniqueMatches.push(match.points);
    }
  }

  return uniqueMatches as Database['public']['Tables']['events']['Row'][];
}
