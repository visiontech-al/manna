## `types`

This folder contains shared TypeScript types used across the app.

Use `types` for:

- API request and response shapes.
- Shared domain models such as users, permissions, and settings.
- Reusable utility types used by multiple modules.

## Rules when editing this folder

- Keep API/domain types here when they are used by services or multiple modules.
- Export shared types from `types/index.ts`.
- Do not add runtime logic, React components, hooks, or API calls here.
