import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Meal } from '@/types/meal';

import { clearCredentials } from './auth';

type MealsState = {
  /** Newest first. In memory only for now: cleared on logout and app restart. */
  items: Meal[];
};

const initialState: MealsState = {
  items: [],
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.items.unshift(action.payload);
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((meal) => meal.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearCredentials, () => initialState);
  },
});

export const { addMeal, removeMeal } = mealsSlice.actions;
export const mealsReducer = mealsSlice.reducer;
