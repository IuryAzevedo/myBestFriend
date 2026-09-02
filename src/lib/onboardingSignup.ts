import { supabase } from './supabase';
import { Gender } from '../types/models';

const AGE_TO_BIRTHDATE: Record<string, () => string> = {
  under_6m: () => offsetYears(0, -3),
  '6_12m': () => offsetYears(0, -9),
  '1_2y': () => offsetYears(-1, -6),
  '2_7y': () => offsetYears(-4, 0),
  over_7y: () => offsetYears(-9, 0),
};

function offsetYears(years: number, months: number) {
  const d = new Date();
  d.setFullYear(d.getFullYear() + years);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

export async function signUpAndCreateFirstPet(params: {
  email: string;
  password: string;
  fullName: string;
  pet: { name: string; breed: string | null; gender: Gender | null; ageRangeKey: string | null };
}) {
  const { email, password, fullName, pet } = params;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (signUpError) throw signUpError;

  const userId = signUpData.user?.id;
  if (!userId) {
    // Confirmação de e-mail pode estar habilitada; o pet será criado no
    // primeiro login em vez de aqui.
    return { pendingEmailConfirmation: true };
  }

  const { data: family, error: familyError } = await supabase
    .from('families')
    .insert({ name: `Família de ${pet.name}`, created_by: userId })
    .select()
    .single();
  if (familyError) throw familyError;

  await supabase.from('family_members').insert({
    family_id: family.id,
    profile_id: userId,
    role: 'owner',
  });

  const birthDate = pet.ageRangeKey ? AGE_TO_BIRTHDATE[pet.ageRangeKey]?.() : null;

  const { error: petError } = await supabase.from('pets').insert({
    family_id: family.id,
    name: pet.name,
    breed: pet.breed,
    gender: pet.gender,
    birth_date: birthDate,
    created_by: userId,
  });
  if (petError) throw petError;

  return { pendingEmailConfirmation: false };
}
