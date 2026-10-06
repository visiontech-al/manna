import { useMemo, useState } from 'react';

import { DEFAULT_CALORIE_GOAL } from '@/constants/app';
import { useForm } from '@/hooks/use-form';
import { useAppDispatch, useAppSelector } from '@/store';
import { addMeal, removeMeal } from '@/store/redux/slices/meals';
import type { Meal, MealType } from '@/types/meal';
import { createId } from '@/utils/createId';
import { formatDayLabel, isSameDay, toDayKey } from '@/utils/date';

import { getDefaultMealType, getMacroGoals, sumMacros } from './helpers';
import { mealSchema } from './schemas';

export type MealSection = {
  key: string;
  title: string;
  calories: number;
  data: Meal[];
};

export function useCalorieGoal() {
  return useAppSelector((state) => state.auth.user?.calorieGoal ?? DEFAULT_CALORIE_GOAL);
}

/** Today's meals, totals and targets for the Home screen. */
export function useTodaySummary() {
  const meals = useAppSelector((state) => state.meals.items);
  const calorieGoal = useCalorieGoal();

  return useMemo(() => {
    const now = new Date();
    const todayMeals = meals.filter((meal) => isSameDay(new Date(meal.loggedAt), now));

    return {
      meals: todayMeals,
      totals: sumMacros(todayMeals),
      calorieGoal,
      macroGoals: getMacroGoals(calorieGoal),
    };
  }, [meals, calorieGoal]);
}

/** All logged meals grouped by calendar day, newest first, for a SectionList. */
export function useMealSections(): MealSection[] {
  const meals = useAppSelector((state) => state.meals.items);

  return useMemo(() => {
    const sections = new Map<string, MealSection>();

    for (const meal of meals) {
      const date = new Date(meal.loggedAt);
      const key = toDayKey(date);
      const section = sections.get(key);

      if (section) {
        section.data.push(meal);
        section.calories += meal.calories;
      } else {
        sections.set(key, { key, title: formatDayLabel(date), calories: meal.calories, data: [meal] });
      }
    }

    return Array.from(sections.values());
  }, [meals]);
}

export function useRemoveMeal() {
  const dispatch = useAppDispatch();

  return (id: string) => dispatch(removeMeal(id));
}

const EMPTY_FORM = { name: '', calories: '', protein: '', carbs: '', fat: '' };

/** Add Meal form. `onSaved` runs after the meal is stored, e.g. to navigate away. */
export function useAddMealForm(onSaved: () => void) {
  const dispatch = useAppDispatch();
  const form = useForm(EMPTY_FORM);
  const [type, setType] = useState<MealType>(getDefaultMealType);

  const submit = () => {
    const data = form.validate(mealSchema);

    if (!data) {
      return;
    }

    dispatch(addMeal({ ...data, id: createId(), type, loggedAt: new Date().toISOString() }));
    form.reset(EMPTY_FORM);
    setType(getDefaultMealType());
    onSaved();
  };

  return { ...form, type, setType, submit };
}
