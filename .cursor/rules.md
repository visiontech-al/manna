You are working in a production-grade React Native application.

PLATFORM
- Expo with Dev Client
- Expo Router for navigation
- Target platforms: iOS and Android only
- Route files live in `app`
- Route groups such as `(auth)` and `(dashboard)` organize routes without changing URLs

LANGUAGE & STYLE
- TypeScript with strict typing
- Functional components only
- No DOM, browser, or web-only APIs
- No HTML or CSS
- No UI libraries unless explicitly requested

ARCHITECTURE
- Module-based folder structure
- `app` contains route files (screens) and route layouts only
- `modules` contains page-level extracted sections when a screen becomes complex
- `components` contains reusable named app components
- `components/ui` contains generic UI primitives such as Button and Input
- `services` contains app-facing API/domain services
- `libs` contains wrappers around third-party libraries
- `constants` contains static values
- `utils` contains pure helper functions
- `types` contains shared TypeScript types
- `hooks` contains reusable app-wide React hooks
- Business logic must live outside generic UI components
- Redux Toolkit for global client state
- TanStack Query for server state
- All HTTP calls must go through services
- Use `BaseService` for repeated resource/CRUD behavior across services
- Services may import `HttpClient` directly for custom endpoints when `BaseService` does not fit
- Route guards live in `guards` and should be applied in route group layouts when the whole group shares an access rule

QUALITY & PERFORMANCE
- Optimize for mobile performance
- Avoid unnecessary re-renders
- Avoid inline styles and inline functions
- Prefer StyleSheet or extracted styles
- Keep files under 300 lines
- Prefer Expo APIs over custom native code

BEHAVIOR
- Follow existing project patterns
- Do not introduce new dependencies without explanation
- Ask for clarification only if requirements are ambiguous
- Preserve existing behavior unless explicitly asked to change it
- Prefer Expo APIs over custom native code
