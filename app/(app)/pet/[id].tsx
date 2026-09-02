import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/Screen';
import { Card } from '../../../src/components/Card';
import { supabase } from '../../../src/lib/supabase';
import { useAppStore } from '../../../src/store/useAppStore';
import { Moment } from '../../../src/types/models';
import { theme, type } from '../../../src/theme';

export default function PetProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pet = useAppStore((s) => s.pets.find((p) => p.id === id));
  const [moments, setMoments] = useState<Moment[]>([]);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('moments')
      .select('*')
      .eq('pet_id', id)
      .order('taken_at', { ascending: false })
      .then(({ data }) => setMoments(data ?? []));
  }, [id]);

  if (!pet) {
    return (
      <Screen>
        <Text style={type.body}>Pet não encontrado.</Text>
      </Screen>
    );
  }

  const shortcuts: { icon: keyof typeof Ionicons.glyphMap; label: string; type: string }[] = [
    { icon: 'medkit', label: 'Vacinas', type: 'vaccines' },
    { icon: 'medical', label: 'Remédios', type: 'medications' },
    { icon: 'water', label: 'Banho', type: 'baths' },
  ];

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color={theme.color.text} />
        </Pressable>
        <Text style={type.h2}>{pet.name}</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Ionicons name="paw" size={40} color={theme.color.brand} />
        </View>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={[type.body, { color: theme.color.textMuted }]}>
          {pet.breed ?? 'Raça não informada'}
        </Text>
      </View>

      <View style={styles.shortcuts}>
        {shortcuts.map((s) => (
          <Pressable
            key={s.type}
            style={styles.shortcut}
            onPress={() => router.push(`/(app)/care/${s.type}?petId=${pet.id}`)}
          >
            <View style={styles.shortcutIcon}>
              <Ionicons name={s.icon} size={22} color={theme.color.brand} />
            </View>
            <Text style={type.caption}>{s.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Momentos</Text>
      {moments.length === 0 ? (
        <Card style={{ alignItems: 'center' }}>
          <Text style={[type.body, { color: theme.color.textMuted, textAlign: 'center' }]}>
            Nenhuma foto de passeio ou viagem registrada ainda.
          </Text>
        </Card>
      ) : (
        <FlatList
          data={moments}
          keyExtractor={(m) => m.id}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={{ gap: theme.spacing.sm }}
          contentContainerStyle={{ gap: theme.spacing.sm }}
          renderItem={({ item }) => (
            <Image source={{ uri: item.photo_url }} style={styles.momentThumb} />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatarWrap: { alignItems: 'center', marginVertical: theme.spacing.lg },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.color.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  name: { ...type.h1, color: theme.color.text },
  shortcuts: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: theme.spacing.xl },
  shortcut: { alignItems: 'center', gap: 6 },
  shortcutIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.color.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.card,
  },
  sectionTitle: { ...type.h2, marginBottom: theme.spacing.sm },
  momentThumb: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.color.surfaceAlt,
  },
});
