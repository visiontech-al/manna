import { useRouter } from 'expo-router';
import { SectionList, SectionListData, StyleSheet, Text, View } from 'react-native';

import { Button, EmptyState, Screen } from '@/components/ui';
import { CONTENT_MAX_WIDTH } from '@/constants/app';
import type { ThemeColors } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { confirm } from '@/libs/dialog/confirm';
import { MealListItem, MealSection, useMealSections, useRemoveMeal } from '@/modules/meals';
import type { Meal } from '@/types/meal';

export default function AllMealsScreen() {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const { isWide } = useBreakpoint();
  const sections = useMealSections();
  const removeMeal = useRemoveMeal();

  const goToAddMeal = () => router.navigate('/add-meal');

  const confirmRemove = (meal: Meal) => {
    confirm({
      title: 'Delete meal?',
      message: `"${meal.name}" will be removed from your log.`,
      confirmLabel: 'Delete',
      destructive: true,
      onConfirm: () => removeMeal(meal.id),
    });
  };

  const renderItem = ({ item }: { item: Meal }) => (
    <MealListItem meal={item} onRemove={confirmRemove} />
  );

  const renderSectionHeader = ({ section }: { section: SectionListData<Meal, MealSection> }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionTotal}>{section.calories.toLocaleString()} kcal</Text>
    </View>
  );

  return (
    <Screen scroll={false}>
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={Separator}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={[styles.content, isWide && styles.contentWide]}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>All meals</Text>
            <Text style={styles.subtitle}>Everything you have logged, by day.</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="list-outline"
            title="No meals yet"
            message="Meals you log will show up here, grouped by day."
            action={<Button title="Add a meal" onPress={goToAddMeal} />}
          />
        }
      />
    </Screen>
  );
}

const keyExtractor = (meal: Meal) => meal.id;

function Separator() {
  const styles = useThemedStyles(createStyles);

  return <View style={styles.separator} />;
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      flexGrow: 1,
      width: '100%',
      maxWidth: CONTENT_MAX_WIDTH.form,
      alignSelf: 'center',
      padding: 20,
    },
    contentWide: {
      padding: 32,
    },
    header: {
      marginBottom: 8,
    },
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
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingTop: 18,
      paddingBottom: 10,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: '700',
    },
    sectionTotal: {
      color: colors.accent,
      fontSize: 14,
      fontWeight: '700',
    },
    separator: {
      height: 10,
    },
  });
