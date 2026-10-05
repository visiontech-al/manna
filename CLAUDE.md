# Manna — working notes for Claude

Calorie and macro tracking app (Expo / React Native, iOS + Android). Currently a
blank shell: demo login, `PublicGuard` / `PrivateGuard`, and empty tab pages.

## Read first

- `.cursor/rules.md`, `.cursor/playbooks.md`, `.cursor/anti-patterns.md` — these
  are the project rules and win over any general house rules.
- The `README.md` of every folder you touch, and its parent's.

## Key facts

- Global state is **Redux Toolkit** (`store/redux`), with the typed hooks from
  `@/store`. Zustand is forbidden here.
- One axios instance: `HttpClient` in `libs/http/http-client.ts`. Screens and
  modules call services, never the client.
- Guards are applied in the route group layouts (`app/(auth)/_layout.tsx`,
  `app/(dashboard)/_layout.tsx`), not per screen.
- The app follows the device light/dark setting. Colors live in `Colors` in
  `constants/theme.ts`; components read them with `useThemedStyles` /
  `useColors` (see `hooks/README.md`). Never hardcode hex colors in components.
- Login is a stub: `app/(auth)/login.tsx` dispatches demo credentials and does
  not call `AuthService` yet. Auth state is not persisted across restarts.

## Checks

`npm run typecheck` and `npm run lint` before finishing.
