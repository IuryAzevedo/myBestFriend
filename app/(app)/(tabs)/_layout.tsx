import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { PawIcon } from '../../../src/components/PawIcon';
import { theme, type } from '../../../src/theme';

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home',
  pets: 'paw',
  care: 'medkit',
  family: 'people',
  more: 'grid',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.color.brand,
        tabBarInactiveTintColor: theme.color.textFaint,
        tabBarLabelStyle: { fontFamily: type.caption.fontFamily, fontSize: 11 },
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) =>
          focused ? (
            <View style={styles.activeDot}>
              <PawIcon size={16} color={theme.color.white} />
            </View>
          ) : (
            <Ionicons name={TAB_ICONS[route.name]} size={22} color={color} />
          ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="pets" options={{ title: 'Pets' }} />
      <Tabs.Screen name="care" options={{ title: 'Cuidados' }} />
      <Tabs.Screen name="family" options={{ title: 'Família' }} />
      <Tabs.Screen name="more" options={{ title: 'Mais' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.color.surface,
    borderTopColor: theme.color.border,
    height: 64,
    paddingTop: 8,
    paddingBottom: 10,
  },
  activeDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.color.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
