import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Activity } from '../types/models';

export function useActivityFeed(petId: string | null) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!petId) {
      setActivities([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('activities')
      .select('*')
      .eq('pet_id', petId)
      .order('started_at', { ascending: false })
      .limit(20);
    setActivities(data ?? []);
    setLoading(false);
  }, [petId]);

  useEffect(() => {
    load();
  }, [load]);

  async function logActivity(type: Activity['type'], loggedBy: string, notes?: string) {
    if (!petId) return;
    await supabase.from('activities').insert({ pet_id: petId, type, logged_by: loggedBy, notes });
    load();
  }

  async function logFeeding(loggedBy: string, amountGrams?: number) {
    if (!petId) return;
    await supabase.from('feeding_logs').insert({ pet_id: petId, fed_by: loggedBy, amount_grams: amountGrams });
    load();
  }

  return { activities, loading, logActivity, logFeeding, reload: load };
}
