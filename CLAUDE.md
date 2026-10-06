# Manna — working notes for Claude

Calorie and macro tracking app (Expo / React Native, iOS + Android + web). Early stage:
local (device-only) login/register, `PublicGuard` / `PrivateGuard`, and four tabs
(Home, Add Meal, All Meals, Account) backed by an in-memory meals slice.

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
- There is no backend yet. Login/register go through `LocalAuthService`, which
  stores accounts and the active session in SecureStore (`libs/storage`), so the
  session survives restarts. `useAuthBootstrap` restores it on start; auth
  `isInitialized` stays false until then. `AuthService` is kept for the real API
  and has the same return shapes.
- Meals (`store/redux/slices/meals.ts`) are in memory only and cleared on logout.
- Web/desktop is supported. Browser-only code lives in `libs/**/*.web.ts` files
  (Metro picks them on web): `secure-storage.web.ts` uses `localStorage` (not
  encrypted), `confirm.web.ts` uses `window.confirm`. Use `confirm` from
  `libs/dialog` instead of `Alert.alert`, which is a no-op on web.
- Responsive layout: `useBreakpoint` (`isWide` >= 768, `isDesktop` >= 1100).
  `Screen` centers content at `CONTENT_MAX_WIDTH`; the dashboard tabs become a
  left sidebar on wide screens.
- Colors come from the brand palette (maroon, tan, dark brown, copper, cream);
  see the comment at the top of `constants/theme.ts`.

## Checks

`npm run typecheck` and `npm run lint` before finishing.
