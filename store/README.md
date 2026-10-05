## `store`

This folder contains global client state managed with Redux Toolkit.

Use `store` for cross-route state such as authentication, the current user, permissions, feature flags, and app-wide preferences.

## Rules when editing this folder

- Only store truly global state here.
- Keep state serializable: no Promises, class instances, or React components.
- Add Redux Toolkit slices in `redux/slices`.
- Keep async work in services or thunks, not directly inside reducers.
- Use typed hooks from `redux/hooks.ts` instead of importing Redux hooks directly.
