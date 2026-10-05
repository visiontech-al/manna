import { HttpClient } from '@/libs/http/http-client';
import { AuthResponse, AuthTokens, LoginCredentials, RegisterUserInput } from '@/types/user';
import { BaseService } from './BaseService';

class AuthService extends BaseService {
  login = async (payload: LoginCredentials) =>
    await HttpClient.post<AuthResponse>('/auth/login', payload);

  logout = async () => await HttpClient.post<void>('/auth/logout', undefined);

  refreshToken = async (refreshToken: string) =>
    await HttpClient.post<AuthTokens>('/auth/refresh', { refreshToken });

  getProfile = async () => await HttpClient.get<AuthResponse['user']>('/auth/profile');

  register = async (payload: RegisterUserInput) =>
    await HttpClient.post<AuthResponse>('/auth/register', payload);
}

export default new AuthService();
