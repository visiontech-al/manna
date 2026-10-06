## `modules/meals`

Meal logging and daily summaries for the Home, Add Meal and All Meals tabs.

- `hooks.ts`: `useTodaySummary` (today's meals, totals, calorie and macro targets),
  `useMealSections` (meals grouped by day for a `SectionList`), `useAddMealForm`,
  `useRemoveMeal`, `useCalorieGoal`.
- `helpers.ts`: pure helpers for macro totals, macro gram targets and the default meal type.
- `schemas.ts`: zod schema for the Add Meal form (string inputs → numbers).
- `components/`: `CalorieSummaryCard`, `MacroBreakdown`, `MealListItem`.

Meals live in the Redux `meals` slice, in memory only: they are cleared on logout and on
app restart. Persisting them needs a storage that fits larger data (e.g. AsyncStorage or
expo-sqlite); SecureStore is meant for small values.
