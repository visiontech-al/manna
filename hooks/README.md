## `hooks`

This folder contains reusable React hooks used across the app.

Use `hooks` for:

- App-wide hooks that are not tied to one module or screen.
- Hooks that wrap React Native or Expo APIs.
- Shared UI behavior such as color scheme, keyboard state, dimensions, or permissions.
- Small reusable stateful logic that multiple screens or components need.

## Rules when editing this folder

- Hook names must start with `use`.
- Keep module-specific hooks inside that module.
- Do not put API clients, services, Redux slices, or UI components here.
- Hooks may call services or read store state when they represent reusable app behavior.

## Examples

- `use-color-scheme.ts` wraps React Native color scheme behavior.
- `use-theme-color.ts` maps the active color scheme to theme tokens.
