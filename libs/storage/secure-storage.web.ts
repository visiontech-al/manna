/**
 * Web version of `SecureStorage`, backed by `localStorage` so accounts and the session
 * survive page reloads. Unlike Keychain/Keystore this is NOT encrypted: anything on the
 * page can read it. Fine for the local demo; real auth must use the backend.
 */
function getStorage(): Storage | null {
  // Undefined during static rendering (expo export) and in some private browsing modes.
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

export class SecureStorage {
  static async getItem<T>(key: string): Promise<T | null> {
    const raw = getStorage()?.getItem(key) ?? null;

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
    getStorage()?.setItem(key, JSON.stringify(value));
  }

  static async removeItem(key: string): Promise<void> {
    getStorage()?.removeItem(key);
  }
}
