## `modules`

This folder contains page-level modules extracted from screens when a page becomes too large or complex.

A module can have the same responsibilities as a page section: business logic, API calls, state, hooks, and UI composition. The difference is that the route file stays smaller and delegates complex parts of the page to one or more modules.

Create a module when:

- A page has too many responsibilities to keep readable in one route file.
- A page contains large independent sections, such as dashboard statistics, top users, sales, charts, or filters.
- A page flow has complex business logic, API calls, state, or multi-step interactions.
- The same page section or logic needs to be reused elsewhere.

## Rules when editing this folder

- Keep modules scoped to the page or domain they support.
- Use `services` for API calls instead of importing HTTP clients directly.
- Reuse generic UI primitives from `components/ui`.
- Keep route files in `app`; modules should not define Expo Router screens.
- Export module APIs from the module folder, not from deep internal files.
