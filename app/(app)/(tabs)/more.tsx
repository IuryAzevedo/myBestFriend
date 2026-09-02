import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/Screen';
import { Card } from '../../../src/components/Card';
import { ProgressBar } from '../../../src/components/ProgressBar';
import { supabase } from '../../../src/lib/supabase';
import { useAppStore } from '../../../src/store/useAppStore';
import { SEED_TIPS } from '../../../src/data/tips';
import { Tip } from '../../../src/types/models';
import { theme, type } from '../../../src/theme';

const TIP_CATEGORY_LABEL: Record<string, string> = {
  care: 'Cuidados',
  feeding: 'Alimentação',
  enrichment: 'Enriquecimento ambiental',
};

const XP_PER_LEVEL = 100;

export default function More() {
  const profile = useAppStore((s) => s.profile);
  const [tips, setTips] = useState<Omit<Tip, 'id'>[]>(SEED_TIPS);

  useEffect(() => {
    supabase
      .from('tips')
      .select('*')
      .limit(10)
      .then(({ data }) => {
        if (data && data.length > 0) setTips(data);
      });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  const xpIntoLevel = (profile?.xp ?? 0) % XP_PER_LEVEL;

  return (
    <Screen scroll>
      <Text style={type.h1}>Mais</Text>

      <Card style={styles.gamificationCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[type.bodyStrong, { color: theme.color.white }]}>
            Nível {profile?.level ?? 1}
          </Text>
          <Text style={[type.caption, { color: theme.color.white }]}>
            {xpIntoLevel}/{XP_PER_LEVEL} xp
          </Text>
        </View>
        <View style={{ marginTop: theme.spacing.sm }}>
          <ProgressBar progress={xpIntoLevel / XP_PER_LEVEL} />
        </View>
        <Text style={[type.caption, { color: theme.color.white, opacity: 0.85, marginTop: theme.spacing.sm }]}>
          Ganhe XP registrando passeios, banhos e cuidados de saúde em dia.
        </Text>
      </Card>

      <Text style={styles.sectionTitle}>Dicas para o seu pet</Text>
      <FlatList
        data={tips}
        keyExtractor={(t, i) => (t as Tip).id ?? String(i)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: theme.spacing.md }}
        renderItem={({ item }) => (
          <Card style={styles.tipCard}>
            <Text style={styles.tipCategory}>{TIP_CATEGORY_LABEL[item.category]}</Text>
            <Text style={[type.h3, { marginVertical: 6 }]} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={[type.caption, { color: theme.color.textMuted }]} numberOfLines={4}>
              {item.body}
            </Text>
          </Card>
        )}
      />

      <Text style={styles.sectionTitle}>Configurações</Text>
      <Card style={{ padding: 0 }}>
        <SettingsRow icon="person" label="Minha conta" />
        <SettingsRow icon="notifications" label="Lembretes e notificações" />
        <SettingsRow icon="shield-checkmark" label="Privacidade" />
        <SettingsRow icon="log-out" label="Sair" danger onPress={() => Alert.alert('Sair', 'Deseja sair da sua conta?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Sair', style: 'destructive', onPress: handleLogout },
        ])} />
      </Card>
    </Screen>
  );
}

function SettingsRow({
  icon,
  label,
  danger,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.settingsRow} onPress={onPress}>
      <Ionicons name={icon} size={20} color={danger ? theme.color.danger : theme.color.text} />
      <Text style={[type.body, { flex: 1, color: danger ? theme.color.danger : theme.color.text }]}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={theme.color.textFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gamificationCard: { backgroundColor: theme.color.brand, marginTop: theme.spacing.lg },
  sectionTitle: { ...type.h2, marginTop: theme.spacing.xl, marginBottom: theme.spacing.sm },
  tipCard: { width: 220 },
  tipCategory: { ...type.caption, color: theme.color.brand, fontFamily: type.bodyStrong.fontFamily },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.border,
  },
});
