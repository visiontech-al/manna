import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';

export default function ModalScreen() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is a modal</Text>
      <Link href="/" dismissTo style={styles.link}>
        Go to home screen
      </Link>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      color: colors.text,
      fontSize: 32,
      fontWeight: '700',
    },
    link: {
      color: colors.primary,
      marginTop: 15,
      paddingVertical: 15,
    },
  });
