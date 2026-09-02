import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Share } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/Screen';
import { Button } from '../../../src/components/Button';
import { supabase } from '../../../src/lib/supabase';
import { useAppStore } from '../../../src/store/useAppStore';
import { theme, type } from '../../../src/theme';

export default function FamilyInvite() {
  const pets = useAppStore((s) => s.pets);
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  useEffect(() => {
    const familyId = pets[0]?.family_id;
    if (!familyId) return;
    supabase
      .from('families')
      .select('invite_code')
      .eq('id', familyId)
      .single()
      .then(({ data }) => setInviteCode(data?.invite_code ?? null));
  }, [pets]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={type.h1}>Convidar família</Text>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={26} color={theme.color.text} />
        </Pressable>
      </View>

      <Text style={[type.body, { color: theme.color.textMuted, marginVertical: theme.spacing.md }]}>
        Compartilhe este código para que outra pessoa cuide do pet junto com você — todos verão
        os mesmos registros de saúde, gastos e atividades.
      </Text>

      <View style={styles.codeBox}>
        <Text style={styles.code}>{inviteCode ?? '••••••'}</Text>
      </View>

      <View style={{ marginTop: theme.spacing.lg }}>
        <Button
          label="Compartilhar código"
          icon="share-social"
          onPress={() =>
            inviteCode && Share.share({ message: `Entre na minha família no MBF com o código: ${inviteCode}` })
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  codeBox: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.color.brandSoft,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  },
  code: { ...type.display, color: theme.color.brand, letterSpacing: 4 },
});
