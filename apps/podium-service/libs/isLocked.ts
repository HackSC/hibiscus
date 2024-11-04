import { supabase } from 'apps/podium-service/libs/supabase';

const isLocked = async (verticalId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('ranking_locks')
      .select()
      .eq('vertical_id', verticalId);

    if (error) {
      throw new Error('Failed to fetch lockings');
    }

    return data.length > 0;
  } catch (error) {
    console.error("Internal Server Error");
    return false;
  }
}

export { isLocked };
