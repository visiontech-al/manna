import { z } from 'zod';

const grams = (label: string) =>
  z
    .string()
    .trim()
    .transform((value) => (value === '' ? '0' : value.replace(',', '.')))
    .pipe(
      z.coerce
        .number<string>({ error: `${label} must be a number` })
        .min(0, `${label} cannot be negative`)
        .max(1000, `${label} looks too high`)
    );

export const mealSchema = z.object({
  name: z.string().trim().min(1, 'Give the meal a name').max(60, 'Keep the name under 60 characters'),
  calories: z
    .string()
    .trim()
    .min(1, 'Calories are required')
    .transform((value) => value.replace(',', '.'))
    .pipe(
      z.coerce
        .number<string>({ error: 'Calories must be a number' })
        .int('Use whole calories')
        .min(1, 'Calories must be above 0')
        .max(10000, 'Calories look too high')
    ),
  protein: grams('Protein'),
  carbs: grams('Carbs'),
  fat: grams('Fat'),
});
