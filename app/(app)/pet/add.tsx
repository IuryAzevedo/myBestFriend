import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/Screen';
import { Button } from '../../../src/components/Button';
import { supabase } from '../../../src/lib/supabase';
import { useAppStore } from '../../../src/store/useAppStore';
import { theme, type } from '../../../src/theme';
import { Gender } from '../../../src/types/models';

export default function AddPet() {
  const pets = useAppStore((s) => s.pets);
  const setPets = useAppStore((s) => s.setPets);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert('Ops', 'Dê um nome para o seu pet.');
      return;
    }
    const familyId = pets[0]?.family_id;
    if (!familyId) {
      Alert.alert('Ops', 'Não encontramos sua família. Tente novamente mais tarde.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('pets')
      .insert({ family_id: familyId, name: name.trim(), breed: breed.trim() || null, gender })
      .select()
      .single();
    setLoading(false);
    if (error) {
      Alert.alert('Erro ao salvar', error.message);
      return;
    }
    setPets([...pets, data]);
    router.back();
  }

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={type.h1}>Novo pet</Text>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={26} color={theme.color.text} />
        </Pressable>
      </View>

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
        <Field label="Nome" value={name} onChangeText={setName} />
        <Field label="Raça (opcional)" value={breed} onChangeText={setBreed} />
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
          {(['female', 'male'] as Gender[]).map((g) => (
            <Pressable
              key={g}
              onPress={() => setGender(g)}
              style={[styles.genderChip, gender === g && styles.genderChipSelected]}
            >
              <Text style={{ color: gender === g ? theme.color.white : theme.color.text }}>
                {g === 'female' ? 'Fêmea' : 'Macho'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <Button label="Salvar pet" onPress={handleSave} loading={loading} />
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
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
  genderChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.color.border,
    backgroundColor: theme.color.surface,
  },
  genderChipSelected: { backgroundColor: theme.color.brand, borderColor: theme.color.brand },
});
