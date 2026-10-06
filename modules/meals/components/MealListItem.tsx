import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps, memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import type { Meal, MealType } from '@/types/meal';
import { formatTime } from '@/utils/date';

const MEAL_ICONS: Record<MealType, ComponentProps<typeof Ionicons>['name']> = {
  breakfast: 'sunny-outline',
  lunch: 'restaurant-outline',
  dinner: 'moon-outline',
  snack: 'cafe-outline',
};

interface MealListItemProps {
  meal: Meal;
  /** Shows a delete button when provided. */
  onRemove?: (meal: Meal) => void;
}

export const MealListItem = memo(function MealListItem({ meal, onRemove }: MealListItemProps) {
  const styles = useThemedStyles(createStyles);
  const colors = useColors();

  const handleRemove = () => onRemove?.(meal);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons name={MEAL_ICONS[meal.type]} size={22} color={colors.icon} />
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {meal.name}
        </Text>
        <Text style={styles.meta}>
          {formatTime(meal.loggedAt)} · P {Math.round(meal.protein)}g · C {Math.round(meal.carbs)}g · F{' '}
          {Math.round(meal.fat)}g
        </Text>
      </View>

      <Text style={styles.calories}>
        {meal.calories}
        <Text style={styles.unit}> kcal</Text>
      </Text>

      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Delete ${meal.name}`}
          hitSlop={10}
          onPress={handleRemove}
          style={styles.remove}
        >
          <Ionicons name="trash-outline" size={18} color={colors.textSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
});

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    icon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surfaceMuted,
    },
    body: {
      flex: 1,
      gap: 3,
    },
    name: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    meta: {
      color: colors.textSecondary,
      fontSize: 12,
    },
    calories: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '700',
    },
    unit: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: '500',
    },
    remove: {
      paddingLeft: 4,
    },
  });
