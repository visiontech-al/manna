import { Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import 'react-native-reanimated';

import { NavigationThemes } from '@/constants/theme';
import { useAuthBootstrap } from '@/hooks/use-auth-bootstrap';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/store';

export const unstable_settings = {
  anchor: '(dashboard)',
};

function RootNavigator() {
  const colorScheme = useColorScheme();

  useAuthBootstrap();

  return (
    <ThemeProvider value={NavigationThemes[colorScheme]}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(dashboard)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
