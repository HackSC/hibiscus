import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import useHibiscusUser from 'apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [participant, setParticipant] = useState(null);
  const { user } = useHibiscusUser();
  const { supabase } = useHibiscusSupabase();
  useEffect(() => {
    async function getParticipant(user_id: string) {
      console.log(user_id);
      const { data: participant, error } = await supabase
        .getClient()
        .from('participants')
        .select('id, dob, school, major, graduation_year, portfolio_link')
        .eq('id', user_id)
        .single();
      if (error) {
        console.log(error);
      }
      return participant;
    }

    getParticipant(user.id).then((participant) => {
      setParticipant(participant);
    });
  }, []);

  return <></>;
}
