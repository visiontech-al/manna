import type { MealType } from '@/types/meal';

/** SecureStore keys. Allowed characters: letters, digits, ".", "-" and "_". */
export const STORAGE_KEYS = {
  session: 'manna.session',
  userPrefix: 'manna.user.',
} as const;

export const DEFAULT_CALORIE_GOAL = 2000;
export const MIN_CALORIE_GOAL = 800;
export const MAX_CALORIE_GOAL = 6000;
export const MIN_PASSWORD_LENGTH = 6;

/** Share of daily calories per macro, used to derive gram targets from the calorie goal. */
export const MACRO_SPLIT = { protein: 0.25, carbs: 0.5, fat: 0.25 } as const;
export const KCAL_PER_GRAM = { protein: 4, carbs: 4, fat: 9 } as const;

export const MEAL_TYPES: { value: MealType; label: string }[] = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
];

/** Window widths (dp / CSS px) where the layout adapts for tablets and desktop. */
export const BREAKPOINTS = {
  wide: 768,
  desktop: 1100,
} as const;

/** Max content widths so pages stay readable on large screens. */
export const CONTENT_MAX_WIDTH = {
  page: 960,
  form: 640,
  auth: 440,
} as const;
