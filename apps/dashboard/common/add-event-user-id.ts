import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { PostgrestError } from '@supabase/supabase-js';
import { container } from 'tsyringe';

export default async function addEventUserId(
  event_id: number,
  user_id: string
): Promise<PostgrestError | true> {
  const supabase = container.resolve(HibiscusSupabaseClient);
  await supabase.setSessionClientSide();

  const eventnameMatches = await supabase
    .getClient()
    .from('events')
    .select()
    .eq('id', `${event_id}`);

  const nameMatches = await supabase
    .getClient()
    .from('user_profiles')
    .select()
    .eq('user_id', `${user_id}`);

  const resEvent = await supabase.addEvent(
    nameMatches.data[0].user_id,
    event_id
  );

  if (resEvent != null) {
    return resEvent;
  }

  const resLeaderboard = await supabase.addtoLeaderboard(
    nameMatches.data[0].user_id,
    eventnameMatches.data[0].points
  );

  if (resLeaderboard != null) {
    return resLeaderboard;
  }

  return true;
}
