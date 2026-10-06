import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, Chip, Input, Screen } from '@/components/ui';
import { CONTENT_MAX_WIDTH, MEAL_TYPES } from '@/constants/app';
import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { useAddMealForm } from '@/modules/meals';

export default function AddMealScreen() {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const goHome = () => router.navigate('/');
  const { values, errors, setField, type, setType, submit } = useAddMealForm(goHome);

  return (
    <Screen maxWidth={CONTENT_MAX_WIDTH.form}>
      <View>
        <Text style={styles.title}>Add a meal</Text>
        <Text style={styles.subtitle}>Log what you ate and its nutrition.</Text>
      </View>

      <View style={styles.chips}>
        {MEAL_TYPES.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={type === option.value}
            onPress={() => setType(option.value)}
          />
        ))}
      </View>

      <Card style={styles.card}>
        <Input
          label="Meal name"
          placeholder="e.g. Chicken salad"
          value={values.name}
          onChangeText={(text) => setField('name', text)}
          error={errors.name}
          returnKeyType="next"
        />
        <Input
          label="Calories (kcal)"
          placeholder="0"
          value={values.calories}
          onChangeText={(text) => setField('calories', text)}
          error={errors.calories}
          keyboardType="number-pad"
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Macros (optional)</Text>
        <View style={styles.macroRow}>
          <Input
            label="Protein (g)"
            placeholder="0"
            value={values.protein}
            onChangeText={(text) => setField('protein', text)}
            error={errors.protein}
            keyboardType="decimal-pad"
            containerStyle={styles.macroField}
          />
          <Input
            label="Carbs (g)"
            placeholder="0"
            value={values.carbs}
            onChangeText={(text) => setField('carbs', text)}
            error={errors.carbs}
            keyboardType="decimal-pad"
            containerStyle={styles.macroField}
          />
          <Input
            label="Fat (g)"
            placeholder="0"
            value={values.fat}
            onChangeText={(text) => setField('fat', text)}
            error={errors.fat}
            keyboardType="decimal-pad"
            containerStyle={styles.macroField}
          />
        </View>
      </Card>

      <Button title="Save Meal" onPress={submit} />
    </Screen>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    title: {
      color: colors.text,
      fontSize: 28,
      fontWeight: '800',
    },
    subtitle: {
      color: colors.textSecondary,
      fontSize: 15,
      marginTop: 4,
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    card: {
      gap: 14,
    },
    cardTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '700',
    },
    macroRow: {
      flexDirection: 'row',
      gap: 10,
    },
    macroField: {
      flex: 1,
    },
  });
