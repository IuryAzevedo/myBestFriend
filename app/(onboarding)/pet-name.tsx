import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { OnboardingHeader } from '../../src/components/OnboardingHeader';
import { useOnboardingStore } from '../../src/store/useOnboardingStore';
import { theme, type } from '../../src/theme';

export default function PetName() {
  const { name, setName } = useOnboardingStore();

  return (
    <Screen scroll>
      <OnboardingHeader step={3} />
      <Text style={styles.title}>Qual é o nome do seu pet?</Text>
      <Text style={styles.subtitle}>
        O MBF vai personalizar lembretes, dicas e conquistas especialmente para ele.
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ex: Dom"
        placeholderTextColor={theme.color.textFaint}
        style={styles.input}
        autoFocus
      />

      <View style={{ flex: 1 }} />
      <Button
        label="Continuar"
        icon="chevron-forward"
        disabled={name.trim().length === 0}
        onPress={() => router.push('/(onboarding)/pet-breed')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1, color: theme.color.text, marginBottom: theme.spacing.xs },
  subtitle: { ...type.body, color: theme.color.textMuted, marginBottom: theme.spacing.xl },
  input: {
    ...type.h1,
    color: theme.color.text,
    borderBottomWidth: 1.5,
    borderBottomColor: theme.color.border,
    paddingVertical: theme.spacing.sm,
  },
});
