import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthTokens, User } from '@/types/user';

type AuthState = {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  /** False until the saved session has been checked on app start. */
  isInitialized: boolean;
};

type CredentialsPayload = {
  user: User;
  tokens: AuthTokens;
};

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
    setAuthInitialized: (state) => {
      state.isInitialized = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { clearCredentials, setAuthInitialized, setCredentials, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
