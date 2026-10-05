AVOID THE FOLLOWING AT ALL TIMES:

- window, document, navigator
- HTML, CSS, or DOM APIs
- Web-only libraries
- Inline styles inside JSX
- Large business flows inside route files
- Business logic inside generic UI components
- Multiple axios instances
- UI side effects in services, such as alerts, toasts, or navigation
- Zustand stores in this boilerplate
- Forcing custom endpoints through `BaseService` when direct `HttpClient` usage is clearer
- Static mutable service state for request-specific resource/params
- Route screens inside `modules`
- Constants inside `utils`
- Generic UI primitives outside `components/ui`
- Module-specific hooks in global `hooks`
- Unnecessary platform conditionals
- Side effects inside render
- Anonymous functions passed to heavy components
