import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { PawIcon } from '../../src/components/PawIcon';
import { theme, type } from '../../src/theme';

export default function Welcome() {
  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.badge}>
          <PawIcon size={40} color={theme.color.white} />
        </View>
        <Text style={styles.title}>Vamos deixar o MBF do jeito do seu pet</Text>
        <Text style={styles.subtitle}>
          Responda algumas perguntas rápidas para personalizarmos cuidados, lembretes e
          dicas para o seu companheiro.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button label="Começar" onPress={() => router.push('/(onboarding)/pet-gender')} />
        <View style={{ height: theme.spacing.md }} />
        <Button
          label="Já tenho uma conta — Entrar"
          variant="ghost"
          onPress={() => router.push('/(auth)/login')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  badge: {
    width: 88,
    height: 88,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.color.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadow.card,
  },
  title: {
    ...type.display,
    color: theme.color.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...type.body,
    color: theme.color.textMuted,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  footer: { paddingBottom: theme.spacing.lg },
});
