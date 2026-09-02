import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { Profile, Pet } from '../types/models';

interface AppState {
  session: Session | null;
  profile: Profile | null;
  pets: Pet[];
  activePetId: string | null;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setPets: (pets: Pet[]) => void;
  setActivePetId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  session: null,
  profile: null,
  pets: [],
  activePetId: null,
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setPets: (pets) =>
    set((state) => ({
      pets,
      activePetId: state.activePetId ?? pets[0]?.id ?? null,
    })),
  setActivePetId: (id) => set({ activePetId: id }),
}));

/** Pet atualmente selecionado (para telas que mostram dados de "1 pet"). */
export const useActivePet = () =>
  useAppStore((s) => s.pets.find((p) => p.id === s.activePetId) ?? s.pets[0] ?? null);
