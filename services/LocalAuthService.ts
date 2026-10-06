import { DEFAULT_CALORIE_GOAL, STORAGE_KEYS } from '@/constants/app';
import { SecureStorage } from '@/libs/storage/secure-storage';
import {
  AuthResponse,
  LoginCredentials,
  RegisterUserInput,
  UpdateProfileInput,
  User,
} from '@/types/user';
import { createId } from '@/utils/createId';
import { normalizeText } from '@/utils/normalizeText';
import { ServiceError } from './BaseService';

/** What is saved per registered account. Device-only demo storage, no backend. */
type StoredAccount = {
  user: User;
  password: string;
};

type StoredSession = {
  email: string;
};

/**
 * On-device stand-in for `AuthService` until the backend exists.
 * Accounts and the active session live in SecureStore, so login survives app restarts.
 * Swap call sites back to `AuthService` once the API is ready; the return shapes match.
 */
class LocalAuthService {
  register = async ({ name, email, password }: RegisterUserInput): Promise<AuthResponse> => {
    const normalizedEmail = normalizeText(email);

    if (await this.readAccount(normalizedEmail)) {
      throw new ServiceError('An account with this email already exists.');
    }

    const user: User = {
      id: createId(),
      email: normalizedEmail,
      name: name.trim(),
      createdAt: new Date().toISOString(),
      calorieGoal: DEFAULT_CALORIE_GOAL,
    };

    await SecureStorage.setItem<StoredAccount>(this.accountKey(normalizedEmail), {
      user,
      password,
    });

    return this.startSession(user);
  };

  login = async ({ email, password }: LoginCredentials): Promise<AuthResponse> => {
    const account = await this.readAccount(normalizeText(email));

    if (!account || account.password !== password) {
      throw new ServiceError('Incorrect email or password.');
    }

    return this.startSession(account.user);
  };

  /** Returns the signed-in account from the last app run, or null. */
  restoreSession = async (): Promise<AuthResponse | null> => {
    const session = await SecureStorage.getItem<StoredSession>(STORAGE_KEYS.session);

    if (!session) {
      return null;
    }

    const account = await this.readAccount(session.email);

    if (!account) {
      await SecureStorage.removeItem(STORAGE_KEYS.session);
      return null;
    }

    return { user: account.user, tokens: this.createTokens(account.user) };
  };

  logout = async () => {
    await SecureStorage.removeItem(STORAGE_KEYS.session);
  };

  updateProfile = async (email: string, input: UpdateProfileInput): Promise<User> => {
    const account = await this.readAccount(email);

    if (!account) {
      throw new ServiceError('Account not found.');
    }

    const user: User = { ...account.user, ...input, name: input.name.trim() };

    await SecureStorage.setItem<StoredAccount>(this.accountKey(email), { ...account, user });

    return user;
  };

  private startSession = async (user: User): Promise<AuthResponse> => {
    await SecureStorage.setItem<StoredSession>(STORAGE_KEYS.session, { email: user.email });

    return { user, tokens: this.createTokens(user) };
  };

  private readAccount = (email: string) =>
    SecureStorage.getItem<StoredAccount>(this.accountKey(email));

  /** SecureStore keys cannot contain `@`, so the email is hex-encoded. */
  private accountKey = (email: string) =>
    STORAGE_KEYS.userPrefix +
    Array.from(email, (char) => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');

  private createTokens = (user: User) => ({
    accessToken: `local-access-${user.id}`,
    refreshToken: `local-refresh-${user.id}`,
  });
}

export default new LocalAuthService();
