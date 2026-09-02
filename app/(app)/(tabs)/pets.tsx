import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../../src/components/Screen';
import { Card } from '../../../src/components/Card';
import { useAppStore } from '../../../src/store/useAppStore';
import { theme, type } from '../../../src/theme';

export default function Pets() {
  const pets = useAppStore((s) => s.pets);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={type.h1}>Seus pets</Text>
        <Pressable onPress={() => router.push('/(app)/pet/add')} style={styles.addBtn}>
          <Ionicons name="add" size={22} color={theme.color.white} />
        </Pressable>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ gap: theme.spacing.md, paddingBottom: theme.spacing.xl }}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/(app)/pet/${item.id}`)}>
            <Card style={styles.petRow}>
              <View style={styles.avatar}>
                <Ionicons name="paw" size={22} color={theme.color.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={type.h3}>{item.name}</Text>
                <Text style={[type.caption, { color: theme.color.textMuted }]}>
                  {item.breed ?? 'Raça não informada'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.color.textFaint} />
            </Card>
          </Pressable>
        )}
        ListEmptyComponent={
          <Card style={{ alignItems: 'center' }}>
            <Text style={[type.body, { color: theme.color.textMuted }]}>
              Nenhum pet cadastrado ainda.
            </Text>
          </Card>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.color.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  petRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.color.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
