## `guards`

This folder contains route guards: small components or hooks that decide whether a route tree can render.

Use `guards` for:

- Authentication checks before protected screens render.
- Redirecting users away from routes they cannot access.
- Keeping Expo Router access rules consistent across route groups.

## Rules when editing this folder

- Keep guards thin: access checks and redirects only.
- Do not add feature business logic, API calls, forms, or UI flows here.
- Guards may read auth/session state, but should not own it.
- Accept `children` when creating wrapper components.
- Export shared guards from `guards/index.ts`.
