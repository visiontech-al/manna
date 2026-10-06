export interface User {
  id: string;
  email: string;
  name: string;
  /** ISO timestamp of registration. */
  createdAt?: string;
  /** Daily calorie target in kcal. */
  calorieGoal?: number;
}

export type UpdateProfileInput = Pick<User, 'name' | 'calorieGoal'>;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterUserInput extends LoginCredentials {
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
