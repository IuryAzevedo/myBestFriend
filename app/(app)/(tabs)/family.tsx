import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Screen } from '../../../src/components/Screen';
import { Card } from '../../../src/components/Card';
import { useAppStore, useActivePet } from '../../../src/store/useAppStore';
import { useActivityFeed } from '../../../src/hooks/useActivityFeed';
import { theme, type } from '../../../src/theme';

const QUICK_ACTIONS: { type: 'walk' | 'play' | 'training'; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { type: 'walk', label: 'Passeio', icon: 'walk' },
  { type: 'play', label: 'Brincadeira', icon: 'tennisball' },
  { type: 'training', label: 'Treino', icon: 'school' },
];

const ACTIVITY_LABEL: Record<string, string> = {
  walk: 'saiu para passear com',
  play: 'brincou com',
  training: 'treinou com',
  vet_visit: 'levou ao veterinário',
  grooming: 'levou para tosa',
  other: 'cuidou de',
  feeding: 'alimentou',
};

export default function Family() {
  const activePet = useActivePet();
  const profile = useAppStore((s) => s.profile);
  const { activities, logActivity, logFeeding } = useActivityFeed(activePet?.id ?? null);

  function handleQuickAction(type: 'walk' | 'play' | 'training') {
    if (!profile) return;
    logActivity(type, profile.id);
  }

  function handleFeed() {
    if (!profile) return;
    logFeeding(profile.id);
    Alert.alert('Registrado!', `Alimentação de ${activePet?.name} registrada agora.`);
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={type.h1}>Família</Text>
        <Pressable style={styles.inviteBtn} onPress={() => router.push('/(app)/family/invite')}>
          <Ionicons name="person-add" size={16} color={theme.color.brand} />
          <Text style={{ color: theme.color.brand, ...type.caption }}>Convidar</Text>
        </Pressable>
      </View>

      {activePet && (
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((a) => (
            <Pressable key={a.type} style={styles.quickAction} onPress={() => handleQuickAction(a.type)}>
              <View style={styles.quickIcon}>
                <Ionicons name={a.icon} size={22} color={theme.color.brand} />
              </View>
              <Text style={type.caption}>{a.label}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.quickAction} onPress={handleFeed}>
            <View style={styles.quickIcon}>
              <Ionicons name="restaurant" size={22} color={theme.color.brand} />
            </View>
            <Text style={type.caption}>Alimentar</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.sectionTitle}>O que rolou hoje</Text>
      <FlatList
        data={activities}
        keyExtractor={(a) => a.id}
        contentContainerStyle={{ gap: theme.spacing.sm, paddingBottom: theme.spacing.xl }}
        renderItem={({ item }) => (
          <Card style={styles.activityRow}>
            <Ionicons name="paw" size={18} color={theme.color.brand} />
            <Text style={[type.body, { flex: 1 }]}>
              Alguém {ACTIVITY_LABEL[item.type] ?? 'cuidou de'} {activePet?.name}
            </Text>
            <Text style={[type.caption, { color: theme.color.textFaint }]}>
              {formatDistanceToNow(new Date(item.started_at), { addSuffix: true, locale: ptBR })}
            </Text>
          </Card>
        )}
        ListEmptyComponent={
          <Card style={{ alignItems: 'center' }}>
            <Text style={[type.body, { color: theme.color.textMuted }]}>
              Ninguém registrou nada ainda hoje. Toque em um ícone acima para começar!
            </Text>
          </Card>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg },
  inviteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.color.brandSoft,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quickActions: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: theme.spacing.xl },
  quickAction: { alignItems: 'center', gap: 6 },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.color.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.card,
  },
  sectionTitle: { ...type.h2, marginBottom: theme.spacing.sm },
  activityRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
});
