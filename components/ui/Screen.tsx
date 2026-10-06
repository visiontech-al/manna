import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { CONTENT_MAX_WIDTH } from '@/constants/app';
import type { ThemeColors } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useThemedStyles } from '@/hooks/use-themed-styles';

interface ScreenProps {
  children: ReactNode;
  /** Wrap content in a ScrollView. Turn off for screens that render their own list. */
  scroll?: boolean;
  /** Safe-area edges to pad. Tab screens skip `bottom` because the tab bar handles it. */
  edges?: Edge[];
  /** Content column width on large screens (web, tablets). Ignored when `scroll` is off. */
  maxWidth?: number;
  contentStyle?: StyleProp<ViewStyle>;
}

const DEFAULT_EDGES: Edge[] = ['top', 'left', 'right'];

/** Themed, safe-area aware, keyboard-safe page wrapper with a centered column on wide screens. */
export function Screen({
  children,
  scroll = true,
  edges = DEFAULT_EDGES,
  maxWidth = CONTENT_MAX_WIDTH.page,
  contentStyle,
}: ScreenProps) {
  const styles = useThemedStyles(createStyles);
  const { isWide } = useBreakpoint();

  return (
    <SafeAreaView edges={edges} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        {scroll ? (
          <ScrollView
            contentContainerStyle={[
              styles.content,
              isWide && styles.contentWide,
              { maxWidth },
              contentStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flex: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
      width: '100%',
      alignSelf: 'center',
      padding: 20,
      gap: 16,
    },
    contentWide: {
      paddingHorizontal: 32,
      paddingVertical: 32,
      gap: 20,
    },
  });
