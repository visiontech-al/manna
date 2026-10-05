import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui';
import { clearCredentials } from '@/store/redux/slices/auth';
import { useAppDispatch } from '@/store';

export default function HomeScreen() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  title: {
    color: '#11181C',
    fontSize: 32,
    fontWeight: '700',
  },
});
