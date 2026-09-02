import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/Screen';
import { Card } from '../../../src/components/Card';
import { PawIcon } from '../../../src/components/PawIcon';
import { useAppStore } from '../../../src/store/useAppStore';
import { useDashboardData } from '../../../src/hooks/useDashboardData';
import { theme, type } from '../../../src/theme';

const CATEGORY_LABEL: Record<string, string> = {
  food: 'Ração',
  bath: 'Banho',
  vaccine: 'Vacinas',
  medication: 'Remédios',
};
const CATEGORY_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  food: 'restaurant',
  bath: 'water',
  vaccine: 'medkit',
  medication: 'medical',
};

export default function Home() {
  const profile = useAppStore((s) => s.profile);
  const pets = useAppStore((s) => s.pets);
  const activePetId = useAppStore((s) => s.activePetId);
  const setActivePetId = useAppStore((s) => s.setActivePetId);
  const activePet = pets.find((p) => p.id === activePetId) ?? pets[0];

  const { monthlyExpenses, upcomingVaccines, activeMedications } = useDashboardData(
    activePet?.id ?? null
  );

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {profile?.full_name?.split(' ')[0] ?? '👋'}</Text>
          <Text style={styles.subGreeting}>Veja como está o cuidado com seu pet</Text>
        </View>
        <View style={styles.streak}>
          <PawIcon size={16} color={theme.color.accent} />
          <Text style={styles.streakText}>{profile?.xp ?? 0} xp</Text>
        </View>
      </View>

      {pets.length > 1 && (
        <FlatList
          horizontal
          data={pets}
          keyExtractor={(p) => p.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: theme.spacing.sm, paddingVertical: theme.spacing.sm }}
          renderItem={({ item }) => {
            const selected = item.id === activePet?.id;
            return (
              <Pressable
                onPress={() => setActivePetId(item.id)}
                style={[styles.petChip, selected && styles.petChipSelected]}
              >
                <Text style={[type.bodyStrong, { color: selected ? theme.color.white : theme.color.text }]}>
                  {item.name}
                </Text>
              </Pressable>
            );
          }}
        />
      )}

      {!activePet ? (
        <Card style={{ marginTop: theme.spacing.lg, alignItems: 'center' }}>
          <Text style={type.h3}>Cadastre seu primeiro pet</Text>
          <Text style={[type.body, styles.muted, { textAlign: 'center', marginVertical: theme.spacing.sm }]}>
            Ainda não vimos nenhum pet na sua família.
          </Text>
          <Pressable onPress={() => router.push('/(app)/pet/add')}>
            <Text style={{ color: theme.color.brand, ...type.bodyStrong }}>+ Adicionar pet</Text>
          </Pressable>
        </Card>
      ) : (
        <>
          <Card style={styles.expenseCard}>
            <View style={styles.expenseHeader}>
              <Text style={styles.expenseLabel}>Gastos deste mês com {activePet.name}</Text>
              <Ionicons name="stats-chart" size={18} color={theme.color.white} />
            </View>
            <Text style={styles.expenseValue}>
              {monthlyExpenses.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
            <View style={styles.expenseBreakdown}>
              {Object.entries(monthlyExpenses.byCategory).map(([cat, value]) => (
                <View key={cat} style={styles.breakdownItem}>
                  <Ionicons name={CATEGORY_ICON[cat]} size={16} color={theme.color.white} />
                  <Text style={styles.breakdownLabel}>{CATEGORY_LABEL[cat]}</Text>
                  <Text style={styles.breakdownValue}>
                    {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Próximos cuidados</Text>
          {upcomingVaccines.length === 0 && activeMedications.length === 0 ? (
            <Card>
              <Text style={[type.body, styles.muted]}>
                Nenhum lembrete pendente. Cadastre vacinas e remédios na aba Cuidados.
              </Text>
            </Card>
          ) : (
            <View style={{ gap: theme.spacing.sm }}>
              {upcomingVaccines.map((v) => (
                <ReminderRow
                  key={v.id}
                  icon="medkit"
                  title={`Vacina: ${v.name}`}
                  subtitle={v.next_due_date ? `Vence em ${v.next_due_date}` : ''}
                />
              ))}
              {activeMedications.map((m) => (
                <ReminderRow
                  key={m.id}
                  icon="medical"
                  title={`Remédio: ${m.name}`}
                  subtitle={m.dosage ?? 'Tratamento contínuo'}
                />
              ))}
            </View>
          )}
        </>
      )}
    </Screen>
  );
}

function ReminderRow({
  icon,
  title,
  subtitle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}) {
  return (
    <Card style={styles.reminderRow}>
      <View style={styles.reminderIcon}>
        <Ionicons name={icon} size={18} color={theme.color.health} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={type.bodyStrong}>{title}</Text>
        {!!subtitle && <Text style={[type.caption, styles.muted]}>{subtitle}</Text>}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { ...type.h1, color: theme.color.text },
  subGreeting: { ...type.body, color: theme.color.textMuted, marginTop: 2 },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.color.accentSoft,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  streakText: { ...type.caption, color: theme.color.text, fontFamily: type.bodyStrong.fontFamily },
  petChip: {
    borderRadius: theme.radius.pill,
    borderWidth: 1.5,
    borderColor: theme.color.border,
    backgroundColor: theme.color.surface,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  petChipSelected: { backgroundColor: theme.color.brand, borderColor: theme.color.brand },
  expenseCard: { backgroundColor: theme.color.brand, marginTop: theme.spacing.lg },
  expenseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  expenseLabel: { ...type.body, color: theme.color.white, opacity: 0.9 },
  expenseValue: { ...type.display, color: theme.color.white, marginTop: 4, marginBottom: theme.spacing.md },
  expenseBreakdown: { gap: theme.spacing.sm },
  breakdownItem: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  breakdownLabel: { ...type.caption, color: theme.color.white, opacity: 0.85, flex: 1 },
  breakdownValue: { ...type.caption, color: theme.color.white, fontFamily: type.bodyStrong.fontFamily },
  sectionTitle: { ...type.h2, color: theme.color.text, marginTop: theme.spacing.xl, marginBottom: theme.spacing.sm },
  reminderRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, paddingVertical: theme.spacing.md },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.color.healthSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  muted: { color: theme.color.textMuted },
});
