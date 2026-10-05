import { Redirect } from 'expo-router';
import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAppSelector } from '@/store';

interface PrivateGuardProps {
  children: ReactNode;
}

export function PrivateGuard({ children }: PrivateGuardProps) {
  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
