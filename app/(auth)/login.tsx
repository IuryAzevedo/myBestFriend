import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { supabase } from '../../src/lib/supabase';
import { theme, type } from '../../src/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert('Não foi possível entrar', error.message);
      return;
    }
    router.replace('/(app)/(tabs)');
  }

  return (
    <Screen scroll>
      <Text style={styles.title}>Bem-vindo de volta</Text>
      <Text style={styles.subtitle}>Entre para ver como seu pet está.</Text>

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
        <View>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor={theme.color.textFaint}
          />
        </View>
        <View>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor={theme.color.textFaint}
          />
        </View>
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <Button label="Entrar" onPress={handleLogin} loading={loading} />
      </View>
    </Screen>
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
