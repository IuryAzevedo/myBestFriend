import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type CareTable = 'vaccines' | 'medications' | 'baths';

export function useCareItems<T = any>(table: CareTable, petId: string | null) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!petId) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const orderColumn =
      table === 'vaccines' ? 'next_due_date' : table === 'medications' ? 'start_date' : 'bath_date';
    const { data } = await supabase
      .from(table)
      .select('*')
      .eq('pet_id', petId)
      .order(orderColumn, { ascending: false });
    setItems((data as T[]) ?? []);
    setLoading(false);
  }, [table, petId]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, reload: load };
}
