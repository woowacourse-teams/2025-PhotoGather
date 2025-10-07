import type { ApiResponse, Method } from '../types/api.type';
import { createQueryString } from '../utils/createQueryString';
import { BASE_URL } from './config';

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
};

const request = async <T>(
  endpoint: string,
  options: {
    method: Method;
    body?: unknown;
    params?: Record<string, unknown>;
  },
): Promise<ApiResponse<T>> => {
  const { method, body, params } = options;
  const url = `${BASE_URL}${endpoint}${createQueryString(params)}`;

  try {
    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok)
      return {
        success: false,
        error: {
          type: 'http',
          status: response.status,
          message:
            data?.message || `Error: response status is ${response.status}`,
        },
      };

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        type: 'network',
        message: error instanceof Error ? error.message : 'Network error',
      },
    };
  }
};

export const http = {
  get: <T>(endpoint: string, params?: Record<string, unknown>) =>
    request<T>(endpoint, { method: 'GET', params }),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: 'POST', body }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: 'PUT', body }),

  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body }),

  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};
