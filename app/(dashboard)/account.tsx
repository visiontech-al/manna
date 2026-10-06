import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, Input, Screen } from '@/components/ui';
import { confirm } from '@/libs/dialog/confirm';
import { CONTENT_MAX_WIDTH } from '@/constants/app';
import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { ProfileHeader, useLogout, useProfileForm } from '@/modules/account';
import { useAppSelector } from '@/store';

export default function AccountScreen() {
  const styles = useThemedStyles(createStyles);
  const user = useAppSelector((state) => state.auth.user);
  const mealCount = useAppSelector((state) => state.meals.items.length);
  const { values, errors, setField, isDirty, status, message, save } = useProfileForm();
  const logout = useLogout();

  const confirmLogout = () => {
    confirm({
      title: 'Log out?',
      message: 'You can sign back in with your email and password.',
      confirmLabel: 'Log out',
      destructive: true,
      onConfirm: logout,
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Screen maxWidth={CONTENT_MAX_WIDTH.form}>
      <Text style={styles.title}>Account</Text>

      <ProfileHeader user={user} />

      <View style={styles.stats}>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{(user.calorieGoal ?? 0).toLocaleString()}</Text>
          <Text style={styles.statLabel}>Daily kcal goal</Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{mealCount}</Text>
          <Text style={styles.statLabel}>Meals logged</Text>
        </Card>
      </View>

      <Card style={styles.form}>
        <Text style={styles.cardTitle}>Profile</Text>
        <Input
          label="Name"
          value={values.name}
          onChangeText={(text) => setField('name', text)}
          error={errors.name}
          autoComplete="name"
        />
        <Input
          label="Daily calorie goal (kcal)"
          value={values.calorieGoal}
          onChangeText={(text) => setField('calorieGoal', text)}
          error={errors.calorieGoal}
          keyboardType="number-pad"
        />
        {status === 'saved' ? <Text style={styles.success}>Changes saved</Text> : null}
        {status === 'error' && message ? <Text style={styles.error}>{message}</Text> : null}
        <Button
          title="Save Changes"
          onPress={save}
          disabled={!isDirty}
          loading={status === 'saving'}
        />
      </Card>

      <Button title="Log Out" variant="outline" onPress={confirmLogout} />
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    title: {
      color: colors.text,
      fontSize: 28,
      fontWeight: '800',
    },
    stats: {
      flexDirection: 'row',
      gap: 12,
    },
    stat: {
      flex: 1,
      gap: 4,
    },
    statValue: {
      color: colors.text,
      fontSize: 22,
      fontWeight: '800',
    },
    statLabel: {
      color: colors.textSecondary,
      fontSize: 13,
    },
    form: {
      gap: 14,
    },
    cardTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '700',
    },
    success: {
      color: colors.accent,
      fontSize: 14,
      fontWeight: '600',
    },
    error: {
      color: colors.danger,
      fontSize: 14,
      fontWeight: '600',
    },
  });
