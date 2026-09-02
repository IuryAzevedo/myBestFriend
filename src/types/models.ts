export type Species = 'dog' | 'cat' | 'other';
export type Gender = 'female' | 'male';

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  xp: number;
  level: number;
}

export interface Family {
  id: string;
  name: string;
  invite_code: string;
  created_by: string;
}

export interface Pet {
  id: string;
  family_id: string;
  name: string;
  species: Species;
  breed: string | null;
  gender: Gender | null;
  birth_date: string | null;
  avatar_url: string | null;
  weight_kg: number | null;
}

export interface Vaccine {
  id: string;
  pet_id: string;
  name: string;
  applied_date: string | null;
  next_due_date: string | null;
  dose_label: string | null;
  vet_name: string | null;
  cost: number | null;
}

export interface Medication {
  id: string;
  pet_id: string;
  name: string;
  dosage: string | null;
  frequency_hours: number | null;
  start_date: string;
  end_date: string | null;
  active: boolean;
  cost: number | null;
}

export interface Bath {
  id: string;
  pet_id: string;
  bath_date: string;
  location: 'home' | 'petshop' | null;
  cost: number | null;
  groomer_name: string | null;
}

export interface Activity {
  id: string;
  pet_id: string;
  type: 'walk' | 'play' | 'training' | 'vet_visit' | 'grooming' | 'other';
  logged_by: string | null;
  started_at: string;
  duration_minutes: number | null;
  notes: string | null;
}

export interface Moment {
  id: string;
  pet_id: string;
  photo_url: string;
  caption: string | null;
  taken_at: string;
}

export interface Tip {
  id: string;
  category: 'care' | 'feeding' | 'enrichment';
  species: Species;
  title: string;
  body: string;
  cover_url: string | null;
}

export interface ExpenseUnified {
  id: string;
  pet_id: string;
  category: 'food' | 'bath' | 'vaccine' | 'medication';
  cost: number;
  spent_on: string;
}
