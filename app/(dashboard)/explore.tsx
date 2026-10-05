import { StyleSheet, Text, View } from 'react-native';
import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';

export default function ExploreScreen() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is explore page</Text>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background,
      padding: 24,
    },
    title: {
      color: colors.text,
      fontSize: 32,
      fontWeight: '700',
    },
  });
