import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/Screen';
import { Card } from '../../../src/components/Card';
import { useAppStore, useActivePet } from '../../../src/store/useAppStore';
import { useCareItems } from '../../../src/hooks/useCareItems';
import { Vaccine, Medication, Bath } from '../../../src/types/models';
import { theme, type } from '../../../src/theme';

type Segment = 'vaccines' | 'medications' | 'baths';

const SEGMENTS: { key: Segment; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'vaccines', label: 'Vacinas', icon: 'medkit' },
  { key: 'medications', label: 'Remédios', icon: 'medical' },
  { key: 'baths', label: 'Banho', icon: 'water' },
];

export default function Care() {
  const [segment, setSegment] = useState<Segment>('vaccines');
  const activePet = useActivePet();

  return (
    <Screen>
      <Text style={type.h1}>Cuidados</Text>
      <Text style={[type.body, { color: theme.color.textMuted, marginBottom: theme.spacing.lg }]}>
        {activePet ? `Acompanhando a saúde de ${activePet.name}` : 'Selecione um pet na aba Início'}
      </Text>

      <View style={styles.segmentBar}>
        {SEGMENTS.map((s) => {
          const active = segment === s.key;
          return (
            <Pressable
              key={s.key}
              onPress={() => setSegment(s.key)}
              style={[styles.segment, active && styles.segmentActive]}
            >
              <Ionicons name={s.icon} size={16} color={active ? theme.color.white : theme.color.text} />
              <Text style={{ color: active ? theme.color.white : theme.color.text, ...type.caption }}>
                {s.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <CareList segment={segment} petId={activePet?.id ?? null} />

      {activePet && (
        <Pressable
          style={styles.fab}
          onPress={() => router.push(`/(app)/care/${segment}?petId=${activePet.id}`)}
        >
          <Ionicons name="add" size={26} color={theme.color.white} />
        </Pressable>
      )}
    </Screen>
  );
}

function CareList({ segment, petId }: { segment: Segment; petId: string | null }) {
  const { items, loading } = useCareItems<Vaccine | Medication | Bath>(segment, petId);

  if (!petId) return null;
  if (!loading && items.length === 0) {
    return (
      <Card style={{ alignItems: 'center' }}>
        <Text style={[type.body, { color: theme.color.textMuted, textAlign: 'center' }]}>
          Nada registrado ainda. Toque em + para adicionar.
        </Text>
      </Card>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item: any) => item.id}
      contentContainerStyle={{ gap: theme.spacing.sm, paddingBottom: 100 }}
      renderItem={({ item }) => <CareRow segment={segment} item={item as any} />}
    />
  );
}

function CareRow({ segment, item }: { segment: Segment; item: any }) {
  let title = '';
  let subtitle = '';
  if (segment === 'vaccines') {
    title = item.name;
    subtitle = item.next_due_date ? `Próxima dose: ${item.next_due_date}` : 'Sem próxima dose agendada';
  } else if (segment === 'medications') {
    title = item.name;
    subtitle = item.active ? `Em uso · ${item.dosage ?? ''}` : 'Tratamento encerrado';
  } else {
    title = item.location === 'petshop' ? 'Banho no petshop' : 'Banho em casa';
    subtitle = item.bath_date;
  }
  return (
    <Card style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={type.bodyStrong}>{title}</Text>
        <Text style={[type.caption, { color: theme.color.textMuted }]}>{subtitle}</Text>
      </View>
      {item.cost != null && (
        <Text style={type.bodyStrong}>
          {Number(item.cost).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  segmentBar: {
    flexDirection: 'row',
    backgroundColor: theme.color.surfaceAlt,
    borderRadius: theme.radius.pill,
    padding: 4,
    marginBottom: theme.spacing.lg,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: theme.radius.pill,
  },
  segmentActive: { backgroundColor: theme.color.brand },
  row: { flexDirection: 'row', alignItems: 'center' },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.color.brand,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.card,
  },
});
