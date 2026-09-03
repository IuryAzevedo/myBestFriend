import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Screen } from "../../src/components/Screen";
import { Button } from "../../src/components/Button";
import { PawIcon } from "../../src/components/PawIcon";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useOnboardingStore } from "../../src/store/useOnboardingStore";
import { theme, type } from "../../src/theme";

export default function PetConfirm() {
  const { name, breed } = useOnboardingStore();

  return (
    <Screen style={{ backgroundColor: theme.color.brand }}>
      <MaterialIcons name="keyboard-arrow-left" size={35} color="black" style={{marginTop: 20 }} 
      onPress={() => router.push('/(onboarding)/pet-breed')}/>
      <View style={styles.center}>
        <View style={styles.avatar}>
          <PawIcon size={56} color={theme.color.brand} />
        </View>
        <Text style={styles.title}>
          <Text style={{ color: theme.color.accent }}>{name || "Seu pet"}</Text>{" "}
          já tem um plano de cuidados!
        </Text>
        <Text style={styles.subtitle}>
          Preparamos lembretes de vacina, remédio e banho, além de dicas
          pensadas para
          {breed ? ` a raça ${breed}` : " o seu pet"}.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          label="Criar minha conta"
          variant="secondary"
          onPress={() => router.push("/(auth)/signup")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.color.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...type.display,
    color: theme.color.white,
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...type.body,
    color: theme.color.white,
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: theme.spacing.md,
  },
  footer: { paddingBottom: theme.spacing.lg },
});
