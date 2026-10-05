import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, variant = 'primary', disabled, style, ...props }: ButtonProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={(state) => [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        state.pressed && !disabled && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      <Text style={[styles.label, variant === 'secondary' && styles.secondaryLabel]}>{title}</Text>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      minHeight: 48,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      paddingHorizontal: 16,
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.surface,
    },
    disabled: {
      opacity: 0.6,
    },
    pressed: {
      opacity: 0.85,
    },
    label: {
      color: colors.onPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryLabel: {
      color: colors.text,
    },
  });
