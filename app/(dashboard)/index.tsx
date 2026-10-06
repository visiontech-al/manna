import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, Card, EmptyState, Screen } from '@/components/ui';
import type { ThemeColors } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { CalorieSummaryCard, MacroBreakdown, MealListItem, useTodaySummary } from '@/modules/meals';
import { useAppSelector } from '@/store';
import { formatLongDate, getGreeting } from '@/utils/date';

export default function HomeScreen() {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { isWide } = useBreakpoint();
  const name = useAppSelector((state) => state.auth.user?.name ?? '');
  const { meals, totals, calorieGoal, macroGoals } = useTodaySummary();
  const firstName = name.split(' ')[0];

  const goToAddMeal = () => router.navigate('/add-meal');
  const goToAccount = () => router.navigate('/account');

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.date}>{formatLongDate(new Date())}</Text>
          <Text style={styles.greeting}>
            {getGreeting()}, {firstName}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open account"
          onPress={goToAccount}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>{(firstName[0] ?? '?').toUpperCase()}</Text>
        </Pressable>
      </View>

      <View style={[styles.columns, isWide && styles.columnsWide]}>
        <View style={[styles.column, isWide && styles.columnWide]}>
          <CalorieSummaryCard eaten={totals.calories} goal={calorieGoal} />
          <MacroBreakdown totals={totals} goals={macroGoals} />
        </View>

        <View style={[styles.column, isWide && styles.columnWide]}>
          <View style={[styles.sectionHeader, isWide && styles.sectionHeaderWide]}>
            <Text style={styles.sectionTitle}>Today&apos;s meals</Text>
            {meals.length > 0 ? (
              <Link href="/all-meals" style={styles.sectionLink}>
                See all
              </Link>
            ) : null}
          </View>

          {meals.length > 0 ? (
            <View style={styles.list}>
              {meals.map((meal) => (
                <MealListItem key={meal.id} meal={meal} />
              ))}
            </View>
          ) : (
            <Card>
              <EmptyState
                icon="restaurant-outline"
                title="Nothing logged yet"
                message="Add your first meal to start filling up today's goal."
                action={<Button title="Log a meal" onPress={goToAddMeal} />}
              />
            </Card>
          )}
        </View>
      </View>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 4,
    },
    headerText: {
      flex: 1,
    },
    date: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '500',
    },
    greeting: {
      color: colors.text,
      fontSize: 26,
      fontWeight: '800',
      marginTop: 2,
    },
    avatar: {
      width: 46,
      height: 46,
      borderRadius: 23,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
    },
    avatarText: {
      color: colors.onAccent,
      fontSize: 18,
      fontWeight: '800',
    },
    columns: {
      gap: 16,
    },
    columnsWide: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 20,
    },
    column: {
      gap: 16,
    },
    columnWide: {
      flex: 1,
      minWidth: 0,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    sectionHeaderWide: {
      marginTop: 0,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 19,
      fontWeight: '700',
    },
    sectionLink: {
      color: colors.primary,
      fontSize: 15,
      fontWeight: '600',
    },
    list: {
      gap: 10,
    },
  });
