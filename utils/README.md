## `utils`

This folder contains small, reusable helper functions.

Use `utils` for:

- Pure functions that transform or normalize values.
- Formatting, parsing, escaping, and validation helpers.
- Logic that is reused across multiple modules and does not belong to one domain.

## Rules when editing this folder

- Keep utilities stateless and side-effect free whenever possible.
- Do not add UI components, hooks, API calls, storage access, or navigation logic.
- Do not place static constants here.
- Export reusable helpers from `utils/index.ts`.
