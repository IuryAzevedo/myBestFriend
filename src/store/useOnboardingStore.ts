import { create } from 'zustand';
import { Gender } from '../types/models';

interface OnboardingDraft {
  gender: Gender | null;
  ageRange: string | null;
  name: string;
  breed: string | null;
  setGender: (g: Gender) => void;
  setAgeRange: (a: string) => void;
  setName: (n: string) => void;
  setBreed: (b: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingDraft>((set) => ({
  gender: null,
  ageRange: null,
  name: '',
  breed: null,
  setGender: (gender) => set({ gender }),
  setAgeRange: (ageRange) => set({ ageRange }),
  setName: (name) => set({ name }),
  setBreed: (breed) => set({ breed }),
  reset: () => set({ gender: null, ageRange: null, name: '', breed: null }),
}));

export const AGE_RANGES = [
  { key: 'under_6m', label: 'Menos de 6 meses' },
  { key: '6_12m', label: '6 a 12 meses' },
  { key: '1_2y', label: '1 a 2 anos' },
  { key: '2_7y', label: '2 a 7 anos' },
  { key: 'over_7y', label: 'Mais de 7 anos' },
];
