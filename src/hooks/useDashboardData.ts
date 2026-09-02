import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Vaccine, Medication } from '../types/models';

export interface MonthlyExpenses {
  total: number;
  byCategory: Record<'food' | 'bath' | 'vaccine' | 'medication', number>;
}

export interface DashboardData {
  loading: boolean;
  monthlyExpenses: MonthlyExpenses;
  upcomingVaccines: Vaccine[];
  activeMedications: Medication[];
  reload: () => void;
}

const EMPTY: MonthlyExpenses = { total: 0, byCategory: { food: 0, bath: 0, vaccine: 0, medication: 0 } };

export function useDashboardData(petId: string | null): DashboardData {
  const [loading, setLoading] = useState(true);
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpenses>(EMPTY);
  const [upcomingVaccines, setUpcomingVaccines] = useState<Vaccine[]>([]);
  const [activeMedications, setActiveMedications] = useState<Medication[]>([]);

  const load = useCallback(async () => {
    if (!petId) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const firstOfMonth = new Date();
    firstOfMonth.setDate(1);
    const monthStart = firstOfMonth.toISOString().slice(0, 10);

    const [{ data: expenses }, { data: vaccines }, { data: meds }] = await Promise.all([
      supabase
        .from('expenses_unified')
        .select('*')
        .eq('pet_id', petId)
        .gte('spent_on', monthStart),
      supabase
        .from('vaccines')
        .select('*')
        .eq('pet_id', petId)
        .not('next_due_date', 'is', null)
        .order('next_due_date', { ascending: true })
        .limit(5),
      supabase.from('medications').select('*').eq('pet_id', petId).eq('active', true),
    ]);

    const byCategory = { food: 0, bath: 0, vaccine: 0, medication: 0 };
    let total = 0;
    for (const e of expenses ?? []) {
      byCategory[e.category as keyof typeof byCategory] += Number(e.cost);
      total += Number(e.cost);
    }

    setMonthlyExpenses({ total, byCategory });
    setUpcomingVaccines(vaccines ?? []);
    setActiveMedications(meds ?? []);
    setLoading(false);
  }, [petId]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, monthlyExpenses, upcomingVaccines, activeMedications, reload: load };
}
