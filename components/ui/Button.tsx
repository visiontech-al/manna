import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
  Text,
} from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import { useThemedStyles } from '@/hooks/use-themed-styles';

/** react-native-web adds `hovered` to the Pressable state (mouse / trackpad). */
type PressState = PressableStateCallbackType & { hovered?: boolean };

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  disabled,
  loading = false,
  style,
  ...props
}: ButtonProps) {
  const styles = useThemedStyles(createStyles);
  const colors = useColors();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={(state: PressState) => [
        styles.button,
        styles[variant],
        isDisabled && styles.disabled,
        state.hovered && !isDisabled && styles.hovered,
        state.pressed && !isDisabled && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.onPrimary : colors.primary} />
      ) : (
        <Text style={[styles.label, styles[`${variant}Label`]]}>{title}</Text>
      )}
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      minHeight: 52,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 14,
      paddingHorizontal: 20,
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.surfaceMuted,
    },
    outline: {
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    disabled: {
      opacity: 0.6,
    },
    hovered: {
      opacity: 0.92,
    },
    pressed: {
      opacity: 0.85,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
    },
    primaryLabel: {
      color: colors.onPrimary,
    },
    secondaryLabel: {
      color: colors.text,
    },
    outlineLabel: {
      color: colors.primary,
    },
    ghostLabel: {
      color: colors.primary,
    },
  });
