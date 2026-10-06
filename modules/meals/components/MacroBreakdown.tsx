import { StyleSheet, Text, View } from 'react-native';

import { Card, ProgressBar } from '@/components/ui';
import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import type { Macros } from '@/types/meal';

type MacroKey = 'protein' | 'carbs' | 'fat';

interface MacroBreakdownProps {
  totals: Macros;
  goals: Record<MacroKey, number>;
}

const MACROS: { key: MacroKey; label: string }[] = [
  { key: 'protein', label: 'Protein' },
  { key: 'carbs', label: 'Carbs' },
  { key: 'fat', label: 'Fat' },
];

export function MacroBreakdown({ totals, goals }: MacroBreakdownProps) {
  const styles = useThemedStyles(createStyles);
  const colors = useColors();

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Macros</Text>
      {MACROS.map(({ key, label }) => (
        <View key={key} style={styles.row}>
          <View style={styles.rowHeader}>
            <View style={styles.labelWrap}>
              <View style={[styles.dot, { backgroundColor: colors[key] }]} />
              <Text style={styles.label}>{label}</Text>
            </View>
            <Text style={styles.value}>
              {Math.round(totals[key])}
              <Text style={styles.goal}> / {goals[key]} g</Text>
            </Text>
          </View>
          <ProgressBar progress={goals[key] > 0 ? totals[key] / goals[key] : 0} color={colors[key]} />
        </View>
      ))}
    </Card>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      gap: 14,
    },
    title: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '700',
    },
    row: {
      gap: 8,
    },
    rowHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    labelWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    label: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '600',
    },
    value: {
      color: colors.text,
      fontSize: 15,
      fontWeight: '700',
    },
    goal: {
      color: colors.textSecondary,
      fontWeight: '500',
    },
  });
