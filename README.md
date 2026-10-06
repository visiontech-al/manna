# Manna

Calorie and macro tracking app for iOS and Android, built with Expo.

Early stage, with no backend yet:

- Register / login with accounts stored on the device (SecureStore); the session
  survives app restarts.
- Home (calories left, macro progress, today's meals), Add Meal, All Meals (by
  day, with delete) and Account (profile, daily calorie goal, log out).
- Logged meals are kept in memory only for now.

## Stack

- Expo SDK 57 with Dev Client, Expo Router (typed routes)
- TypeScript (strict), React Compiler enabled
- Redux Toolkit for global client state (`store/`)
- TanStack Query for server state
- Axios through the single `HttpClient` in `libs/http`

## Get started

```bash
npm install
```

To open it in Expo Go on a phone (same Wi-Fi), start in Expo Go mode and scan
the QR code:

```bash
npx expo start --go
```

Native builds (Dev Client):

```bash
npm run android
```

```bash
npm run ios
```

The API base URL comes from `EXPO_PUBLIC_API_URL` (defaults to
`http://localhost:3000`, see `constants/global.ts`). Put it in a local `.env`,
which is git-ignored.

## Checks

```bash
npm run typecheck
```

```bash
npm run lint
```

## Structure

```text
app/          Expo Router routes and layouts only
  (auth)/       public routes, wrapped in PublicGuard
  (dashboard)/  protected tab routes, wrapped in PrivateGuard
modules/      page-level sections extracted from complex screens
components/   reusable app components; components/ui for generic primitives
guards/       route access checks and redirects
services/     typed domain services (BaseService for CRUD resources)
libs/         third-party wrappers, including the one HTTP client
store/        Redux Toolkit slices and typed hooks
hooks/        app-wide hooks
constants/    static values and theme tokens
types/        shared API and domain types
utils/        small pure helpers
```

Each folder has a `README.md` describing what belongs there. Project rules for
AI-assisted work live in `.cursor/rules.md`, `.cursor/playbooks.md` and
`.cursor/anti-patterns.md`.
