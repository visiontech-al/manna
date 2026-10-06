## `modules/auth`

Login and registration flows used by `app/(auth)/login.tsx` and `app/(auth)/register.tsx`.

- `hooks.ts`: `useLoginForm` and `useRegisterForm` hold form state, validate with the zod
  schemas in `schemas.ts`, call `LocalAuthService` and dispatch `setCredentials`.
  `PublicGuard` then redirects to the dashboard.
- `components/`: `AuthHeader` (logo + titles) and `FormMessage` (form-level error banner).

Accounts are stored on the device only (see `services/LocalAuthService.ts`). When the
backend is ready, swap `LocalAuthService` for `AuthService` in `hooks.ts`.
