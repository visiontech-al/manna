import { Pressable, PressableProps, PressableStateCallbackType, StyleSheet, Text } from 'react-native';

import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';

/** react-native-web adds `hovered` to the Pressable state (mouse / trackpad). */
type PressState = PressableStateCallbackType & { hovered?: boolean };

interface ChipProps extends Omit<PressableProps, 'children'> {
  label: string;
  selected?: boolean;
}

export function Chip({ label, selected = false, style, ...props }: ChipProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={(state: PressState) => [
        styles.chip,
        state.hovered && !selected && styles.hovered,
        selected && styles.selected,
        state.pressed && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    hovered: {
      borderColor: colors.primary,
    },
    selected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    pressed: {
      opacity: 0.85,
    },
    label: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },
    selectedLabel: {
      color: colors.onPrimary,
    },
  });
