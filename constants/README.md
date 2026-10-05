## `constants`

This folder contains static values used across the app.

Use `constants` for:

- Theme tokens such as colors, fonts, and spacing.
- App configuration values such as API URLs and timeouts.
- Fixed option lists, limits, keys, and enum-like values.
- Shared values that are read by multiple modules.

## Rules when editing this folder

- Keep constants static and side-effect free.
- Do not add functions that transform, format, parse, or validate values.
- Put reusable helper functions in `utils` instead.
- Export shared constants from a focused file such as `app.ts` or `theme.ts`.
