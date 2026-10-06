import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, Input, Screen } from '@/components/ui';
import { CONTENT_MAX_WIDTH } from '@/constants/app';
import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { AuthHeader, FormMessage, useRegisterForm } from '@/modules/auth';

export default function RegisterScreen() {
  const styles = useThemedStyles(createStyles);
  const { values, errors, setField, submit, submitting, formError } = useRegisterForm();

  return (
    <Screen
      edges={['top', 'bottom', 'left', 'right']}
      maxWidth={CONTENT_MAX_WIDTH.auth}
      contentStyle={styles.content}
    >
      <AuthHeader title="Create your account" subtitle="Start tracking calories and macros today" />

      <Card style={styles.form}>
        <FormMessage message={formError} />

        <Input
          label="Name"
          placeholder="Your name"
          value={values.name}
          onChangeText={(text) => setField('name', text)}
          error={errors.name}
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
        />

        <Input
          label="Email"
          placeholder="you@example.com"
          value={values.email}
          onChangeText={(text) => setField('email', text)}
          error={errors.email}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          returnKeyType="next"
        />

        <Input
          label="Password"
          placeholder="At least 6 characters"
          value={values.password}
          onChangeText={(text) => setField('password', text)}
          error={errors.password}
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="next"
        />

        <Input
          label="Confirm password"
          placeholder="Repeat your password"
          value={values.confirmPassword}
          onChangeText={(text) => setField('confirmPassword', text)}
          error={errors.confirmPassword}
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
          onSubmitEditing={submit}
        />

        <Button title="Create Account" onPress={submit} loading={submitting} />
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Link href="/login" replace style={styles.link}>
          Sign in
        </Link>
      </View>
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      justifyContent: 'center',
      paddingHorizontal: 24,
      gap: 24,
    },
    form: {
      gap: 16,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    footerText: {
      color: colors.textSecondary,
      fontSize: 15,
    },
    link: {
      color: colors.primary,
      fontSize: 15,
      fontWeight: '700',
    },
  });
