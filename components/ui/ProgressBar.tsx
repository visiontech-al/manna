import { StyleSheet, View } from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface ProgressBarProps {
  /** 0 to 1. Values outside the range are clamped. */
  progress: number;
  color: string;
  trackColor?: string;
  height?: number;
}

export function ProgressBar({ progress, color, trackColor, height = 8 }: ProgressBarProps) {
  const styles = useThemedStyles(createStyles);
  const percent = Math.min(Math.max(progress, 0), 1) * 100;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(percent) }}
      style={[styles.track, { height, borderRadius: height / 2 }, trackColor ? { backgroundColor: trackColor } : null]}
    >
      <View style={[styles.fill, { width: `${percent}%`, backgroundColor: color, borderRadius: height / 2 }]} />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    track: {
      width: '100%',
      overflow: 'hidden',
      backgroundColor: colors.track,
    },
    fill: {
      height: '100%',
    },
  });
