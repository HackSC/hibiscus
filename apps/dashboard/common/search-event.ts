import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { container } from 'tsyringe';

export default async function searchEvent(): Promise<any[]> {
  const supabase = container.resolve(HibiscusSupabaseClient);
  await supabase.setSessionClientSide();

  const eventnameMatches = await supabase.getClient().from('events').select();

  return eventnameMatches.data;
}
