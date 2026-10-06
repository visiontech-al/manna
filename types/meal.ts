export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal extends Macros {
  id: string;
  name: string;
  type: MealType;
  /** ISO timestamp of when the meal was logged. */
  loggedAt: string;
}

export type NewMealInput = Omit<Meal, 'id' | 'loggedAt'>;
