## `services`

This folder contains app-facing services that modules and screens can import.

Before editing code, read the project `.cursor` instructions:

- `.cursor/rules.md`
- `.cursor/playbooks.md`
- `.cursor/anti-patterns.md`

Use `services` for:

- Domain API services grouped by backend context.
- Stable public entry points over lower-level infrastructure in `libs`.
- App-level service methods that return typed data and hide transport details.
- Shared repeated service behavior through `BaseService`.

## Rules when editing this folder

- Domain services may extend `BaseService` when they share resource/CRUD behavior.
- CRUD-like services should define `resource()` and use `index`, `get`, `create`, `update`, `patch`, and `delete`.
- Custom services may use `HttpClient` directly when CRUD helpers do not fit.
- Do not force custom endpoints through `BaseService` just to avoid importing `HttpClient`.
- No UI components, hooks, navigation, alerts, toasts, or React state.
- Keep service methods typed and grouped by domain.
- Modules and screens should import domain services from here instead of reaching into transport details.
- Let callers decide how to show errors; `BaseService` only normalizes errors for services that use its CRUD helpers.

## Example

```typescript
import { BaseService } from './BaseService';
import { User } from '@/types/user';

class UserService extends BaseService {
  protected resource() {
    return 'user';
  }

  getUser = async (id: string) => await this.get<User>(id);

  save = async (user: User) => await this.create<User>(user);
}

export default new UserService();
```

For custom endpoints, a service can use `HttpClient` directly:

```typescript
import { HttpClient } from '@/libs/http/http-client';

class AuthService {
  login = async (payload: LoginCredentials) =>
    await HttpClient.post<AuthResponse>('/auth/login', payload);
}
```
