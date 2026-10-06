import { StyleSheet, Text, View } from 'react-native';

import { Card, ProgressBar } from '@/components/ui';
import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface CalorieSummaryCardProps {
  eaten: number;
  goal: number;
}

export function CalorieSummaryCard({ eaten, goal }: CalorieSummaryCardProps) {
  const styles = useThemedStyles(createStyles);
  const colors = useColors();
  const remaining = goal - eaten;
  const isOver = remaining < 0;

  return (
    <Card variant="highlight" style={styles.card}>
      <Text style={styles.label}>Calories today</Text>

      <View style={styles.headline}>
        <Text style={styles.value}>{Math.abs(remaining).toLocaleString()}</Text>
        <Text style={styles.unit}>{isOver ? 'kcal over' : 'kcal left'}</Text>
      </View>

      <ProgressBar
        progress={goal > 0 ? eaten / goal : 0}
        color={colors.onPrimary}
        trackColor={colors.highlightTrack}
        height={10}
      />

      <View style={styles.stats}>
        <View>
          <Text style={styles.statValue}>{eaten.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Eaten</Text>
        </View>
        <View style={styles.statRight}>
          <Text style={styles.statValue}>{goal.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Daily goal</Text>
        </View>
      </View>
    </Card>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      gap: 14,
      padding: 22,
    },
    label: {
      color: colors.onPrimaryMuted,
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    headline: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 8,
    },
    value: {
      color: colors.onPrimary,
      fontSize: 44,
      fontWeight: '800',
    },
    unit: {
      color: colors.onPrimaryMuted,
      fontSize: 17,
      fontWeight: '600',
    },
    stats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statRight: {
      alignItems: 'flex-end',
    },
    statValue: {
      color: colors.onPrimary,
      fontSize: 18,
      fontWeight: '700',
    },
    statLabel: {
      color: colors.onPrimaryMuted,
      fontSize: 13,
      marginTop: 2,
    },
  });
