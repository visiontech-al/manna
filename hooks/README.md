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

- `use-color-scheme.ts` wraps React Native color scheme behavior. It is the one
  place that decides light or dark, so a future in-app override goes here.
- `use-colors.ts` returns the theme colors for the active color scheme.
- `use-themed-styles.ts` builds a component's `StyleSheet` from the theme colors.

## Theming

Never hardcode colors in components. Add a token to `Colors` in
`constants/theme.ts` (both `light` and `dark`), then read it with one of the
theme hooks:

```tsx
export function Card() {
  const styles = useThemedStyles(createStyles);

  return <View style={styles.card} />;
}

// Outside the component, so the reference is stable.
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: { backgroundColor: colors.surface, borderColor: colors.border },
  });
```

Use `useColors()` for single values that are not styles, such as
`placeholderTextColor` or navigator `screenOptions`.
