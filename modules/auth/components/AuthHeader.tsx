import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  const styles = useThemedStyles(createStyles);
  const colors = useColors();

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Ionicons name="nutrition" size={36} color={colors.onPrimary} />
      </View>
      <Text style={styles.brand}>Manna</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginBottom: 8,
    },
    logo: {
      width: 76,
      height: 76,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      marginBottom: 14,
    },
    brand: {
      color: colors.accent,
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 3,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    title: {
      color: colors.text,
      fontSize: 28,
      fontWeight: '800',
      textAlign: 'center',
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: 15,
      marginTop: 6,
      textAlign: 'center',
    },
  });
