import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="pet-gender" />
      <Stack.Screen name="pet-age" />
      <Stack.Screen name="pet-name" />
      <Stack.Screen name="pet-breed" />
      <Stack.Screen name="pet-confirm" />
    </Stack>
  );
}
