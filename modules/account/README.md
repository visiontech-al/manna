## `modules/account`

Profile and session actions for `app/(dashboard)/account.tsx`.

- `hooks.ts`: `useProfileForm` edits the name and daily calorie goal and saves them through
  `LocalAuthService.updateProfile` (persisted on the device, then mirrored into Redux).
  `useLogout` ends the saved session and clears credentials; `PrivateGuard` then
  redirects to login.
- `components/ProfileHeader.tsx`: avatar initials, name, email and member-since date.
