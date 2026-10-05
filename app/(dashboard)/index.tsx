import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui';
import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { clearCredentials } from '@/store/redux/slices/auth';
import { useAppDispatch } from '@/store';

export default function HomeScreen() {
  const styles = useThemedStyles(createStyles);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="Logout" variant="secondary" onPress={handleLogout} />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      gap: 16,
      backgroundColor: colors.background,
      padding: 24,
    },
    title: {
      color: colors.text,
      fontSize: 32,
      fontWeight: '700',
    },
  });
