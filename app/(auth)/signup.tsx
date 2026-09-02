import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { useOnboardingStore } from '../../src/store/useOnboardingStore';
import { signUpAndCreateFirstPet } from '../../src/lib/onboardingSignup';
import { theme, type } from '../../src/theme';

export default function Signup() {
  const draft = useOnboardingStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!fullName || !email || !password) {
      Alert.alert('Ops', 'Preencha nome, e-mail e senha para continuar.');
      return;
    }
    setLoading(true);
    try {
      const result = await signUpAndCreateFirstPet({
        email,
        password,
        fullName,
        pet: {
          name: draft.name,
          breed: draft.breed,
          gender: draft.gender,
          ageRangeKey: draft.ageRange,
        },
      });
      draft.reset();
      if (result.pendingEmailConfirmation) {
        Alert.alert(
          'Confirme seu e-mail',
          'Enviamos um link de confirmação. Depois de confirmar, faça login para continuar.'
        );
        router.replace('/(auth)/login');
      } else {
        router.replace('/(app)/(tabs)');
      }
    } catch (err: any) {
      Alert.alert('Não foi possível criar sua conta', err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen scroll>
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>Só mais um passo para começar a cuidar do seu pet.</Text>

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
        <Field label="Seu nome" value={fullName} onChangeText={setFullName} autoCapitalize="words" />
        <Field label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Field label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <Button label="Criar conta" onPress={handleSignup} loading={loading} />
        <View style={{ height: theme.spacing.sm }} />
        <Button label="Já tenho conta" variant="ghost" onPress={() => router.push('/(auth)/login')} />
      </View>
    </Screen>
  );
}

function Field(props: React.ComponentProps<typeof TextInput> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...rest} placeholderTextColor={theme.color.textFaint} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { ...type.h1, color: theme.color.text },
  subtitle: { ...type.body, color: theme.color.textMuted, marginTop: theme.spacing.xs },
  label: { ...type.caption, color: theme.color.textMuted, marginBottom: 6 },
  input: {
    ...type.body,
    color: theme.color.text,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.color.border,
    paddingHorizontal: theme.spacing.md,
    height: 50,
  },
});
