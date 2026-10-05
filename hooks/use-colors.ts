import { Colors, type ThemeColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/** Theme colors for the device's current color scheme. Re-renders when the user switches light/dark. */
export function useColors(): ThemeColors {
  const colorScheme = useColorScheme();

  return Colors[colorScheme];
}
