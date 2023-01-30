import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { Database } from '@hibiscus/types';
import { container } from 'tsyringe';

export default async function addEvent(
  event_id: number,
  user_id: string
): Promise<any> {
  //Database['public']['Tables']['event_log']['Row'][]
  const supabase = container.resolve(HibiscusSupabaseClient);
  await supabase.setSessionClientSide();

  const eventnameMatches = await supabase
    .getClient()
    .from('events')
    .select()
    .eq('id', `${event_id}`);

  const nameMatches = await supabase
    .getClient()
    .from('participants')
    .select()
    .eq('wristband_id', `${user_id}`);

  console.log(nameMatches);

  console.log(eventnameMatches.data[0].points);

  try {
    supabase.addEvent(nameMatches.data[0].id, event_id);
    supabase.addtoLeaderboard(
      nameMatches.data[0].id,
      eventnameMatches.data[0].points
    );

    return true;
  } catch {
    return false;
  }

  // Merge the results of both queries
  // const uniqueMatchIds = new Set(
  //   eventnameMatches.data.map((match) => match.id)
  // );
  // const uniqueMatches = [eventnameMatches.data];
  // for (const match of nameMatches.data) {
  //   if (!uniqueMatchIds.has(match.name)) {
  //     uniqueMatchIds.add(match.name);
  //     uniqueMatches.push(match.name);
  //   }
  // }
}
