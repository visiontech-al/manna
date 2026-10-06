import { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'filled';
  label?: string;
  error?: string;
  /** Style for the wrapper that holds the label, field and error. `style` targets the field. */
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  style,
  variant = 'default',
  label,
  error,
  containerStyle,
  placeholderTextColor,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const colors = useColors();
  const styles = useThemedStyles(createStyles);
  const [focused, setFocused] = useState(false);

  const handleFocus: TextInputProps['onFocus'] = (event) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur: TextInputProps['onBlur'] = (event) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={placeholderTextColor ?? colors.placeholder}
        style={[
          styles.input,
          styles[variant],
          focused && styles.inputFocused,
          error ? styles.inputError : null,
          style,
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      gap: 6,
    },
    label: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },
    input: {
      minHeight: 50,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'transparent',
      color: colors.text,
      fontSize: 16,
      paddingHorizontal: 16,
      // Web: the themed focus border below replaces the browser's default outline.
      outlineWidth: 0,
    },
    default: {
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    filled: {
      backgroundColor: colors.surfaceMuted,
    },
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 1.5,
    },
    inputError: {
      borderColor: colors.danger,
    },
    error: {
      color: colors.danger,
      fontSize: 13,
    },
  });
