import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from './ProgressBar';
import { theme, type } from '../theme';

export function OnboardingHeader({ step, total = 5 }: { step: number; total?: number }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={theme.color.text} />
        </Pressable>
        <Text style={styles.label}>
          Personalidade do pet {step}/{total}
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ProgressBar progress={step / total} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: theme.spacing.xl },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  label: { ...type.bodyStrong, color: theme.color.brand },
});
