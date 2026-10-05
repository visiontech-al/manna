## `components`

This folder contains reusable React Native components.

Use `components` for:

- Named app components that are reused across screens or modules.
- Components with a clear product meaning, such as `PaymentModal` or `OrderSummary`.
- Shared composition pieces that are not tied to one route.

## `components/ui`

Use `components/ui` only for generic UI primitives such as `Button`, `Input`, `Card`, or `Badge`.

UI primitives should be reusable building blocks with no feature-specific business logic, API calls, navigation decisions, or hardcoded screen assumptions.

## Rules when editing this folder

- Keep generic primitives in `components/ui`.
- Keep named app components directly in `components` or in a focused subfolder.
- Do not put screens or route files here.
- Export shared UI primitives from `components/ui/index.ts`.
