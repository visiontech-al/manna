## `app`

This folder contains Expo Router route files.

Every file and folder inside `app` maps to a route in the application. Route files should stay focused on screen composition: they assemble UI components, call hooks, and connect page-level modules when needed.

## Route groups

Folders wrapped in parentheses are route groups. They organize routes without adding that folder name to the URL.

```text
app/(auth)/login.tsx        -> /login
app/(dashboard)/index.tsx   -> /
app/(dashboard)/explore.tsx -> /explore
```

Use route groups to separate different areas of the app, such as public auth screens and protected dashboard screens.

## Layout files

`_layout.tsx` files define navigation for the route level they live in.

- `app/_layout.tsx` sets up global providers and root navigation.
- `app/(auth)/_layout.tsx` configures auth screens and applies public route guards.
- `app/(dashboard)/_layout.tsx` configures dashboard screens and applies private route guards.

## Rules when editing this folder

- Keep route files readable and screen-focused.
- Move complex business logic or large page sections into `modules`.
- Use shared UI primitives from `components/ui`.
- Use `guards` in layouts when an entire route group has the same access rule.
- Do not put reusable non-screen components here; use `components` or `modules` instead.
