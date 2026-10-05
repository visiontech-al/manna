import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'filled';
}

export function Input({
  style,
  variant = 'default',
  placeholderTextColor,
  ...props
}: InputProps) {
  const colors = useColors();
  const styles = useThemedStyles(createStyles);

  return (
    <TextInput
      placeholderTextColor={placeholderTextColor ?? colors.placeholder}
      style={[styles.input, styles[variant], style]}
      {...props}
    />
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    input: {
      minHeight: 48,
      borderRadius: 12,
      color: colors.text,
      fontSize: 16,
      paddingHorizontal: 16,
    },
    default: {
      borderColor: colors.border,
      borderWidth: 1,
      backgroundColor: colors.background,
    },
    filled: {
      backgroundColor: colors.surface,
    },
  });
