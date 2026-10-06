import { KCAL_PER_GRAM, MACRO_SPLIT } from '@/constants/app';
import type { Macros, Meal, MealType } from '@/types/meal';

export const EMPTY_MACROS: Macros = { calories: 0, protein: 0, carbs: 0, fat: 0 };

export function sumMacros(meals: Meal[]): Macros {
  return meals.reduce<Macros>(
    (total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat,
    }),
    EMPTY_MACROS
  );
}

/** Gram targets per macro derived from the daily calorie goal. */
export function getMacroGoals(calorieGoal: number) {
  return {
    protein: Math.round((calorieGoal * MACRO_SPLIT.protein) / KCAL_PER_GRAM.protein),
    carbs: Math.round((calorieGoal * MACRO_SPLIT.carbs) / KCAL_PER_GRAM.carbs),
    fat: Math.round((calorieGoal * MACRO_SPLIT.fat) / KCAL_PER_GRAM.fat),
  };
}

export function getDefaultMealType(date: Date = new Date()): MealType {
  const hour = date.getHours();

  if (hour < 11) {
    return 'breakfast';
  }

  if (hour < 16) {
    return 'lunch';
  }

  if (hour < 21) {
    return 'dinner';
  }

  return 'snack';
}
