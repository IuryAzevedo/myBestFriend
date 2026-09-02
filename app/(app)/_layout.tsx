import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAppStore } from '../../src/store/useAppStore';
import { supabase } from '../../src/lib/supabase';

export default function AppLayout() {
  const session = useAppStore((s) => s.session);
  const setProfile = useAppStore((s) => s.setProfile);
  const setPets = useAppStore((s) => s.setPets);

  useEffect(() => {
    if (!session) return;

    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => data && setProfile(data));

    supabase
      .from('family_members')
      .select('family_id')
      .eq('profile_id', session.user.id)
      .then(async ({ data: memberships }) => {
        const familyIds = (memberships ?? []).map((m) => m.family_id);
        if (familyIds.length === 0) return;
        const { data: pets } = await supabase.from('pets').select('*').in('family_id', familyIds);
        setPets(pets ?? []);
      });
  }, [session?.user.id]);

  if (!session) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="pet/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="pet/add" options={{ presentation: 'modal' }} />
      <Stack.Screen name="care/[type]" options={{ presentation: 'card' }} />
      <Stack.Screen name="family/invite" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
