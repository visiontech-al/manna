import * as SecureStore from 'expo-secure-store';

/**
 * Small typed wrapper over expo-secure-store (Keychain on iOS, Keystore-backed on Android).
 * Values are stored as JSON. Keep each value small: Android warns above ~2 KB.
 * Web uses `secure-storage.web.ts` instead (SecureStore has no web implementation).
 */
export class SecureStorage {
  static async getItem<T>(key: string): Promise<T | null> {
    const raw = await SecureStore.getItemAsync(key);

    if (raw === null) {
      return null;
    }

    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }

  static async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}
