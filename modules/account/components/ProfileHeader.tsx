import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui';
import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import type { User } from '@/types/user';

interface ProfileHeaderProps {
  user: User;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0]?.[0];

  return (initials ?? '?').toUpperCase();
}

function formatMemberSince(iso?: string) {
  if (!iso) {
    return null;
  }

  return new Date(iso).toLocaleDateString([], { month: 'long', year: 'numeric' });
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const styles = useThemedStyles(createStyles);
  const memberSince = formatMemberSince(user.createdAt);

  return (
    <Card variant="highlight" style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{getInitials(user.name)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {user.email}
        </Text>
        {memberSince ? <Text style={styles.since}>Member since {memberSince}</Text> : null}
      </View>
    </Card>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      padding: 20,
    },
    avatar: {
      width: 68,
      height: 68,
      borderRadius: 34,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.onPrimary,
    },
    initials: {
      color: colors.primary,
      fontSize: 26,
      fontWeight: '800',
    },
    info: {
      flex: 1,
      gap: 2,
    },
    name: {
      color: colors.onPrimary,
      fontSize: 20,
      fontWeight: '700',
    },
    email: {
      color: colors.onPrimaryMuted,
      fontSize: 14,
    },
    since: {
      color: colors.onPrimaryMuted,
      fontSize: 12,
      marginTop: 6,
    },
  });
