import { Tabs } from 'expo-router';
import React from 'react';

import { PrivateGuard } from '@/guards';
import { useColors } from '@/hooks/use-colors';

export default function TabLayout() {
  const colors = useColors();

  return (
    <PrivateGuard>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
          }}
        />
      </Tabs>
    </PrivateGuard>
  );
}
