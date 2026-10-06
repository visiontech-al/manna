import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import type { ColorValue } from 'react-native';

import { PrivateGuard } from '@/guards';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useColors } from '@/hooks/use-colors';

type IconName = ComponentProps<typeof Ionicons>['name'];

function tabIcon(focusedName: IconName, name: IconName) {
  return function TabIcon({ focused, color, size }: { focused: boolean; color: ColorValue; size: number }) {
    return <Ionicons name={focused ? focusedName : name} color={color} size={size} />;
  };
}

const HomeIcon = tabIcon('home', 'home-outline');
const AddMealIcon = tabIcon('add-circle', 'add-circle-outline');
const AllMealsIcon = tabIcon('list', 'list-outline');
const AccountIcon = tabIcon('person-circle', 'person-circle-outline');

export default function TabLayout() {
  const colors = useColors();
  const { isWide, isDesktop } = useBreakpoint();

  return (
    <PrivateGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.tabIconSelected,
          tabBarInactiveTintColor: colors.tabIconDefault,
          tabBarLabelStyle: { fontWeight: '600' },
          // Phones: bottom tab bar. Tablets / browser / desktop: left sidebar.
          tabBarPosition: isWide ? 'left' : 'bottom',
          tabBarVariant: isWide ? 'material' : 'uikit',
          tabBarLabelPosition: isDesktop ? 'beside-icon' : 'below-icon',
          tabBarActiveBackgroundColor: isWide ? colors.surfaceMuted : undefined,
          tabBarStyle: isWide
            ? {
                backgroundColor: colors.tabBar,
                borderRightColor: colors.border,
                paddingTop: 16,
                minWidth: isDesktop ? 220 : undefined,
              }
            : { backgroundColor: colors.tabBar, borderTopColor: colors.border },
        }}>
        <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: HomeIcon }} />
        <Tabs.Screen name="add-meal" options={{ title: 'Add Meal', tabBarIcon: AddMealIcon }} />
        <Tabs.Screen name="all-meals" options={{ title: 'All Meals', tabBarIcon: AllMealsIcon }} />
        <Tabs.Screen name="account" options={{ title: 'Account', tabBarIcon: AccountIcon }} />
      </Tabs>
    </PrivateGuard>
  );
}
