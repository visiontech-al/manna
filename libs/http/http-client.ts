import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { APP_URL, AXIOS_TIMEOUT_DURATION } from '@/constants/global';

const instance = axios.create({
  baseURL: APP_URL,
  timeout: AXIOS_TIMEOUT_DURATION,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
);

export class HttpClient {
  static instance = instance;

  static async get<T>(url: string, options?: AxiosRequestConfig) {
    const response = await this.instance.get<T>(url, options);

    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: AxiosRequestConfig) {
    const response = await this.instance.post<T>(url, data, options);

    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await this.instance.put<T>(url, data);

    return response.data;
  }

  static async patch<T>(url: string, data: unknown) {
    const response = await this.instance.patch<T>(url, data);

    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await this.instance.delete<T>(url);

    return response.data;
  }
}
