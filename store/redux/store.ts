import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { mealsReducer } from './slices/meals';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meals: mealsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
