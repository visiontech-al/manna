import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface FormMessageProps {
  message: string | null;
}

/** Form-level error banner, e.g. wrong password or email already taken. */
export function FormMessage({ message }: FormMessageProps) {
  const styles = useThemedStyles(createStyles);
  const colors = useColors();

  if (!message) {
    return null;
  }

  return (
    <View accessibilityRole="alert" style={styles.container}>
      <Ionicons name="alert-circle" size={18} color={colors.danger} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.danger,
      backgroundColor: colors.surfaceMuted,
    },
    text: {
      flex: 1,
      color: colors.danger,
      fontSize: 14,
      fontWeight: '500',
    },
  });
