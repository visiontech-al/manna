import { useMemo } from 'react';

import type { ThemeColors } from '@/constants/theme';
import { useColors } from '@/hooks/use-colors';

/**
 * Builds a component's styles from the active theme colors.
 *
 * Define `createStyles` outside the component so it is a stable reference;
 * styles are then rebuilt only when the color scheme changes.
 */
export function useThemedStyles<T>(createStyles: (colors: ThemeColors) => T): T {
  const colors = useColors();

  return useMemo(() => createStyles(colors), [createStyles, colors]);
}
