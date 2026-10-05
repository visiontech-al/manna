================================
MODULE SCAFFOLD PLAYBOOK
================================
TASK: Scaffold a new module

Inputs:
- Module name: <module>
- Parent page/domain: <page-or-domain>

Files to create:
- index.ts
- README.md
- hooks.ts (only if reusable stateful logic is needed)
- types.ts (only for module-local types)
- components/ (only for module-specific UI pieces)

Rules:
- Module-based architecture
- Modules are page-level extracted sections, not route files
- Use modules when a page becomes too complex, e.g. dashboard statistics/top users/sales
- Module code may contain business logic, API orchestration, state, hooks, and UI composition
- Route files stay in `app`
- Strong typing
- Use services for API calls
- Use `components/ui` for generic UI primitives
- No Expo Router navigation setup inside modules
================================


================================
SCREEN CREATION PLAYBOOK
================================
TASK: Create a screen

Inputs:
- File path: app/<route>.tsx

Requirements:
- Expo Router screen
- Keyboard-safe layout
- Platform compatible (iOS + Android)
- Keep route files readable and screen-focused
- Use route group layouts for shared public/private guards
- Move complex business logic or large page sections into `modules`
- Use `components/ui` primitives for generic UI
================================


================================
REDUX STORE PLAYBOOK
================================
TASK: Create Redux state

Requirements:
- Use Redux Toolkit slices under `store/redux/slices`
- Use typed hooks from `store/redux/hooks.ts`
- Store only global client state
- Keep reducers synchronous and serializable
- Keep async work in services or thunks
================================


================================
API LAYER PLAYBOOK
================================
TASK: Add API functions

Requirements:
- Add domain services under `services`
- Use `BaseService` only for repeated resource/CRUD behavior
- CRUD-like services may extend `BaseService` and define `resource()`
- Use BaseService CRUD helpers: `index`, `get`, `create`, `update`, `patch`, `delete`
- Explicit request and response types
- No axios instance creation
- Custom services may use `HttpClient` directly when BaseService CRUD helpers do not fit
- No UI side effects in services: no alerts, no toasts, no navigation
================================


================================
GUARD PLAYBOOK
================================
TASK: Add or update route guard

Requirements:
- Guards live in `guards`
- Public auth route groups use `PublicGuard`
- Protected app route groups use `PrivateGuard`
- Apply guards in route group `_layout.tsx` files
- Guards may read Redux auth state
- Guards should only check access and redirect
================================


================================
EXPO / NATIVE INTEGRATION PLAYBOOK
================================
TASK: Add native functionality

Rules:
- Use Expo APIs first
- Explain permissions handling
- Support iOS and Android
- Use Dev Client when native libraries are required
================================


================================
PERFORMANCE REVIEW PLAYBOOK
================================
TASK: Performance review

Check for:
- Unnecessary re-renders
- Incorrect hook usage
- Expensive effects
- FlatList optimizations
================================


================================
REFACTOR PLAYBOOK
================================
TASK: Refactor code

Goals:
- Focus on ReadME files
- Reduce complexity
- Extract hooks
- Extract page sections into modules
- Improve readability
- Preserve existing behavior
================================


================================
PRE-COMMIT REVIEW PLAYBOOK
================================
TASK: Pre-commit review

Act as a senior React Native engineer.
Review for:
- Architecture consistency
- Expo compatibility
- Platform-specific bugs
- Type safety issues
================================
