import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { OnboardingHeader } from '../../src/components/OnboardingHeader';
import { useOnboardingStore } from '../../src/store/useOnboardingStore';
import { DOG_BREEDS } from '../../src/data/breeds';
import { theme, type } from '../../src/theme';

export default function PetBreed() {
  const { breed, setBreed } = useOnboardingStore();
  const [query, setQuery] = useState(breed ?? '');

  const results = useMemo(
    () =>
      query.trim().length === 0
        ? []
        : DOG_BREEDS.filter((b) => b.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  function selectBreed(b: string) {
    setBreed(b);
    setQuery(b);
  }

  return (
    <Screen>
      <OnboardingHeader step={4} />
      <Text style={styles.title}>Qual é a raça do seu pet?</Text>
      <Text style={styles.subtitle}>
        Usamos a raça para sugerir dicas de cuidado e alimentação mais precisas.
      </Text>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={theme.color.textFaint} />
        <TextInput
          value={query}
          onChangeText={(t) => {
            setQuery(t);
            setBreed('');
          }}
          placeholder="Buscar raça..."
          placeholderTextColor={theme.color.textFaint}
          style={styles.searchInput}
        />
        {query.length > 0 && (
          <Pressable onPress={() => { setQuery(''); setBreed(''); }}>
            <Ionicons name="close-circle" size={18} color={theme.color.textFaint} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item}
        style={{ marginTop: theme.spacing.sm }}
        renderItem={({ item }) => (
          <Pressable style={styles.resultRow} onPress={() => selectBreed(item)}>
            <Text style={type.body}>{item}</Text>
          </Pressable>
        )}
      />

      <View style={styles.footer}>
        <Button
          label="Continuar"
          icon="chevron-forward"
          disabled={!breed}
          onPress={() => router.push('/(onboarding)/pet-confirm')}
        />
        <Button
          label="Não sei / é um vira-lata"
          variant="ghost"
          onPress={() => {
            setBreed('Vira-lata');
            router.push('/(onboarding)/pet-confirm');
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1, color: theme.color.text, marginBottom: theme.spacing.xs },
  subtitle: { ...type.body, color: theme.color.textMuted, marginBottom: theme.spacing.lg },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.color.border,
    paddingHorizontal: theme.spacing.md,
    height: 52,
  },
  searchInput: { flex: 1, ...type.body, color: theme.color.text },
  resultRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.border,
  },
  footer: { paddingTop: theme.spacing.md, gap: theme.spacing.sm },
});
