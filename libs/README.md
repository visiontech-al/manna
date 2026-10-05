## `libs`

This folder contains thin wrappers around external libraries used by the app.

Use `libs` for:

- Creating one controlled entry point for third-party libraries.
- Keeping library setup, configuration, and defaults outside feature code.
- Hiding vendor-specific APIs behind small app-owned abstractions.
- Making future library changes easier by limiting direct imports across the app.

## Rules when editing this folder

- No UI components, screens, hooks, navigation, or feature-specific business logic.
- Do not import third-party libraries directly in modules when a wrapper exists here.
- Keep wrappers small, typed, and focused on library integration only.
- Export one public wrapper per library or integration.
- Do not create multiple wrappers for the same library without a clear reason.
