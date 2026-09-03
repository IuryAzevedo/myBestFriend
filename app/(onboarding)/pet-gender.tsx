import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { OnboardingHeader } from '../../src/components/OnboardingHeader';
import { useOnboardingStore } from '../../src/store/useOnboardingStore';
import { theme, type } from '../../src/theme';
import { Gender } from '../../src/types/models';

export default function PetGender() {
  const { gender, setGender } = useOnboardingStore();

  const options: { key: Gender; label: string; icon: keyof typeof Ionicons.glyphMap; color: string }[] = [
    { key: 'female', label: 'Fêmea', icon: 'female', color: theme.color.health },
    { key: 'male', label: 'Macho', icon: 'male', color: theme.color.brand },
  ];

  return (
    <Screen scroll>
      <OnboardingHeader step={1} />
      <Text style={styles.title}>Seu pet é:</Text>

      <View style={styles.row}>
        {options.map((opt) => {
          const selected = gender === opt.key;
          return (
            <Pressable
              key={opt.key}
              onPress={() => setGender(opt.key)}
              style={[styles.option, selected && styles.optionSelected]}
            >
              <Ionicons name={opt.icon} size={36} color={opt.color} />
              <Text style={styles.optionLabel}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ flex: 1 , marginTop: 20}} />
      <Button
        label="Continuar"
        icon="chevron-forward"
        disabled={!gender}
        onPress={() => router.push('/(onboarding)/pet-age')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1, color: theme.color.text, marginBottom: theme.spacing.xl },
  row: { flexDirection: 'row', gap: theme.spacing.md },
  option: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: theme.color.border,
    backgroundColor: theme.color.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  optionSelected: {
    borderColor: theme.color.brand,
    backgroundColor: theme.color.brandSoft,
  },
  optionLabel: { ...type.h3, color: theme.color.text },
});
