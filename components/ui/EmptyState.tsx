import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface EmptyStateProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  message: string;
  /** Optional call to action, usually a Button. */
  action?: ReactNode;
}

export function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  const styles = useThemedStyles(createStyles);
  const colors = useColors();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={30} color={colors.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: 32,
      paddingHorizontal: 24,
    },
    iconWrap: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surfaceMuted,
      marginBottom: 14,
    },
    title: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '700',
      textAlign: 'center',
    },
    message: {
      color: colors.textSecondary,
      fontSize: 14,
      marginTop: 6,
      textAlign: 'center',
      lineHeight: 20,
    },
    action: {
      alignSelf: 'stretch',
      marginTop: 18,
    },
  });
