import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { container } from 'tsyringe';

export default async function searchEventId(query: number): Promise<string> {
  const supabase = container.resolve(HibiscusSupabaseClient);
  await supabase.setSessionClientSide();

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
