import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/Screen';
import { Button } from '../../../src/components/Button';
import { supabase } from '../../../src/lib/supabase';
import { theme, type } from '../../../src/theme';

const CONFIG = {
  vaccines: { title: 'Nova vacina', table: 'vaccines' as const },
  medications: { title: 'Novo remédio', table: 'medications' as const },
  baths: { title: 'Novo banho', table: 'baths' as const },
};

export default function CareForm() {
  const { type: careType, petId } = useLocalSearchParams<{ type: keyof typeof CONFIG; petId: string }>();
  const config = CONFIG[careType] ?? CONFIG.vaccines;

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [nextDueDate, setNextDueDate] = useState('');
  const [dosage, setDosage] = useState('');
  const [cost, setCost] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!petId) return;
    setLoading(true);

    let payload: Record<string, any> = { pet_id: petId, cost: cost ? Number(cost) : null };

    if (careType === 'vaccines') {
      payload = { ...payload, name, applied_date: date, next_due_date: nextDueDate || null };
    } else if (careType === 'medications') {
      payload = { ...payload, name, dosage, start_date: date, active: true };
    } else {
      payload = { ...payload, bath_date: date, location: 'home' };
    }

    const { error } = await supabase.from(config.table).insert(payload);
    setLoading(false);
    if (error) {
      Alert.alert('Erro ao salvar', error.message);
      return;
    }
    router.back();
  }

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={type.h1}>{config.title}</Text>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={26} color={theme.color.text} />
        </Pressable>
      </View>

      <View style={{ gap: theme.spacing.md, marginTop: theme.spacing.lg }}>
        {careType !== 'baths' && (
          <Field
            label={careType === 'vaccines' ? 'Nome da vacina' : 'Nome do remédio'}
            value={name}
            onChangeText={setName}
          />
        )}
        {careType === 'medications' && <Field label="Dosagem" value={dosage} onChangeText={setDosage} />}
        <Field
          label={careType === 'baths' ? 'Data do banho' : 'Data de aplicação'}
          value={date}
          onChangeText={setDate}
          placeholder="AAAA-MM-DD"
        />
        {careType === 'vaccines' && (
          <Field
            label="Próxima dose (opcional)"
            value={nextDueDate}
            onChangeText={setNextDueDate}
            placeholder="AAAA-MM-DD"
          />
        )}
        <Field label="Custo, R$ (opcional)" value={cost} onChangeText={setCost} keyboardType="decimal-pad" />
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <Button label="Salvar" onPress={handleSave} loading={loading} />
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
});
