import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, Input, Screen } from '@/components/ui';
import { CONTENT_MAX_WIDTH } from '@/constants/app';
import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { AuthHeader, FormMessage, useLoginForm } from '@/modules/auth';

export default function LoginScreen() {
  const styles = useThemedStyles(createStyles);
  const { values, errors, setField, submit, submitting, formError } = useLoginForm();

  return (
    <Screen
      edges={['top', 'bottom', 'left', 'right']}
      maxWidth={CONTENT_MAX_WIDTH.auth}
      contentStyle={styles.content}
    >
      <AuthHeader title="Welcome back" subtitle="Sign in to keep tracking your meals" />

      <Card style={styles.form}>
        <FormMessage message={formError} />

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
          placeholder="Your password"
          value={values.password}
          onChangeText={(text) => setField('password', text)}
          error={errors.password}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={submit}
        />

        <Button title="Sign In" onPress={submit} loading={submitting} />
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>New to Manna? </Text>
        <Link href="/register" style={styles.link}>
          Create an account
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
