import { StyleSheet, View, ViewProps } from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface CardProps extends ViewProps {
  variant?: 'default' | 'highlight';
}

export function Card({ variant = 'default', style, ...props }: CardProps) {
  const styles = useThemedStyles(createStyles);

  return <View style={[styles.card, styles[variant], style]} {...props} />;
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      borderRadius: 20,
      padding: 18,
    },
    default: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
    },
    highlight: {
      backgroundColor: colors.primary,
    },
  });
