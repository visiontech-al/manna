/**
 * App colors for light and dark mode, built from the Manna palette:
 * maroon #6F1D1B, tan #BB9457, dark brown #432818, copper #99582A, cream #FFE6A7.
 * Values that are not in the palette are lighter/darker shades of it.
 */

import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';
import { Platform } from 'react-native';

const Palette = {
  maroon: '#6F1D1B',
  tan: '#BB9457',
  brown: '#432818',
  copper: '#99582A',
  cream: '#FFE6A7',
};

const lightColors = {
  text: Palette.brown,
  textSecondary: '#7A5235',
  background: '#FFF6DF',
  surface: '#FFFFFF',
  surfaceMuted: Palette.cream,
  border: '#EDD6A0',
  placeholder: '#A88A6A',
  primary: Palette.maroon,
  onPrimary: Palette.cream,
  onPrimaryMuted: '#E7C68A',
  highlightTrack: '#8F3A35',
  accent: Palette.tan,
  onAccent: Palette.brown,
  danger: Palette.maroon,
  tint: Palette.maroon,
  icon: Palette.copper,
  tabBar: '#FFFFFF',
  tabIconDefault: '#A88A6A',
  tabIconSelected: Palette.maroon,
  protein: Palette.maroon,
  carbs: Palette.tan,
  fat: Palette.copper,
  track: '#F5E3B8',
};

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof lightColors;

export const Colors: Record<ColorScheme, ThemeColors> = {
  light: lightColors,
  dark: {
    text: Palette.cream,
    textSecondary: '#D4B98A',
    background: '#24150C',
    surface: Palette.brown,
    surfaceMuted: '#553420',
    border: '#5E3D25',
    placeholder: '#9C7E5C',
    primary: Palette.tan,
    onPrimary: Palette.brown,
    onPrimaryMuted: '#6B4A2E',
    highlightTrack: '#A07B47',
    accent: Palette.copper,
    onAccent: Palette.cream,
    danger: '#E8826E',
    tint: Palette.tan,
    icon: Palette.tan,
    tabBar: '#2E1B10',
    tabIconDefault: '#9C7E5C',
    tabIconSelected: Palette.tan,
    protein: '#C9504C',
    carbs: Palette.tan,
    fat: '#C77B45',
    track: '#553420',
  },
};

export const NavigationThemes: Record<ColorScheme, Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.light.primary,
      background: Colors.light.background,
      card: Colors.light.tabBar,
      text: Colors.light.text,
      border: Colors.light.border,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.dark.primary,
      background: Colors.dark.background,
      card: Colors.dark.tabBar,
      text: Colors.dark.text,
      border: Colors.dark.border,
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
