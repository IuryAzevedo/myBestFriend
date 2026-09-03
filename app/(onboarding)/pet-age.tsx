import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { OnboardingHeader } from '../../src/components/OnboardingHeader';
import { useOnboardingStore, AGE_RANGES } from '../../src/store/useOnboardingStore';
import { theme, type } from '../../src/theme';

export default function PetAge() {
  const { ageRange, setAgeRange } = useOnboardingStore();

  return (
    <Screen scroll>
      <OnboardingHeader step={2} />
      <Text style={styles.title}>Qual é a idade do seu pet?</Text>

      <View style={{ gap: theme.spacing.sm }}>
        {AGE_RANGES.map((opt) => {
          const selected = ageRange === opt.key;
          return (
            <Pressable
              key={opt.key}
              onPress={() => setAgeRange(opt.key)}
              style={[styles.option, selected && styles.optionSelected]}
            >
              <Text style={[type.bodyStrong, { color: theme.color.text }]}>{opt.label}</Text>
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected && <Ionicons name="checkmark" size={14} color={theme.color.white} />}
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={{ flex: 1 , marginTop: 20}} />
      <Button
        label="Continuar"
        icon="chevron-forward"
        disabled={!ageRange}
        onPress={() => router.push('/(onboarding)/pet-name')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1, color: theme.color.text, marginBottom: theme.spacing.xl },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: theme.color.border,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    paddingVertical: 16,
    paddingHorizontal: theme.spacing.lg,
  },
  optionSelected: { borderColor: theme.color.brand, backgroundColor: theme.color.brandSoft },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: theme.color.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { backgroundColor: theme.color.brand, borderColor: theme.color.brand },
});
