import { AxiosError, AxiosRequestConfig } from 'axios';

import { HttpClient } from '@/libs/http/http-client';

type IndexOptions = {
  page?: number;
  itemsPerPage?: number;
  showArchived?: boolean;
  sortBy?: Array<string | null>;
  sortDesc?: boolean[];
  type?: string;
};

type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

export class ServiceError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ServiceError';
  }
}

export class BaseService {
  protected prefix() {
    return '/api';
  }

  protected resource() {
    return '';
  }

  protected formatIndexParams(options: IndexOptions | null = null, search: string | null = null) {
    if (!options) {
      return {};
    }

    const sortPrefix = options.sortDesc?.[0] ? '-' : '';
    const sortValue = options.sortBy?.[0] ? `${sortPrefix}${options.sortBy[0]}` : '';

    return {
      params: {
        page: options.page,
        itemsPerPage: options.itemsPerPage,
        showArchived: options.showArchived ? 1 : 0,
        sort: sortValue,
        type: options.type ?? '',
        search: search === null ? '' : encodeURIComponent(search),
      },
    };
  }

  protected endpoint(path = '') {
    const prefix = this.prefix().replace(/\/$/, '');
    const resource = this.resource().replace(/^\/|\/$/g, '');
    const suffix = path.replace(/^\/|\/$/g, '');

    return [prefix, resource, suffix].filter(Boolean).join('/');
  }

  protected handleError(error: unknown): never {
    if (this.isAxiosError(error)) {
      const response = error.response;
      const data = response?.data;

      if (data?.errors) {
        const message = Object.values(data.errors).flat().join('');
        throw new ServiceError(message || 'Validation error', response?.status);
      }

      throw new ServiceError(
        data?.message || 'An error has occurred. Please try again',
        response?.status
      );
    }

    throw error;
  }

  private isAxiosError(error: unknown): error is AxiosError<ApiErrorResponse> {
    return error instanceof Error && 'isAxiosError' in error;
  }

  async index<T>(options: IndexOptions | null = null, search: string | null = null) {
    try {
      return await HttpClient.get<T>(this.endpoint(), this.formatIndexParams(options, search));
    } catch (error) {
      this.handleError(error);
    }
  }

  async get<T>(id: string | number, requestConfig?: AxiosRequestConfig) {
    try {
      return await HttpClient.get<T>(this.endpoint(String(id)), requestConfig);
    } catch (error) {
      this.handleError(error);
    }
  }

  async create<T>(payload: unknown) {
    try {
      return await HttpClient.post<T>(this.endpoint(), payload);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update<T>(id: string | number, payload: unknown) {
    try {
      return await HttpClient.put<T>(this.endpoint(String(id)), payload);
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch<T>(id: string | number, payload: unknown) {
    try {
      return await HttpClient.patch<T>(this.endpoint(String(id)), payload);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete<T>(id: string | number) {
    try {
      return await HttpClient.delete<T>(this.endpoint(String(id)));
    } catch (error) {
      this.handleError(error);
    }
  }
}
