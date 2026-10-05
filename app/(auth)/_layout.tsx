import { Stack } from 'expo-router';
import { PublicGuard } from '@/guards';

export default function AuthLayout() {
  return (
    <PublicGuard>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" />
      </Stack>
    </PublicGuard>
  );
}

