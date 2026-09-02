import { Redirect } from 'expo-router';
import { useAppStore } from '../src/store/useAppStore';

export default function Index() {
  const session = useAppStore((s) => s.session);

  if (!session) {
    return <Redirect href="/(onboarding)/welcome" />;
  }
  return <Redirect href="/(app)/(tabs)" />;
}
