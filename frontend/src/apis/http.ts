import type { ApiResponse } from '../types/api.type';
import { BASE_URL } from './config';

const defaultHeaders: Record<string, string> = {};

export const setAuthToken = (token: string | null) => {
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  } else {
    delete defaultHeaders.Authorization;
  }
};

const buildQueryString = (params?: Record<string, unknown>): string => {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString() ? `?${searchParams.toString()}` : '';
};

const request = async <T>(
  endpoint: string,
  options: {
    method: string;
    body?: unknown;
    params?: Record<string, unknown>;
  },
): Promise<ApiResponse<T>> => {
  const { method, body, params } = options;
  const url = `${BASE_URL}${endpoint}${buildQueryString(params)}`;

  const isFormData = body instanceof FormData;

  const headers: HeadersInit = {
    ...(defaultHeaders.Authorization && {
      Authorization: defaultHeaders.Authorization,
    }),
    ...(!isFormData && { 'Content-Type': 'application/json' }),
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data as T,
      };
    }

    return {
      success: false,
      error: data?.message || `Error: ${response.status}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
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

export const uploadFile = async <T>(
  endpoint: string,
  file: File,
  additionalData?: Record<string, unknown>,
): Promise<ApiResponse<T>> => {
  const formData = new FormData();
  formData.append('file', file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(defaultHeaders.Authorization && {
          Authorization: defaultHeaders.Authorization,
        }),
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data as T,
      };
    }

    return {
      success: false,
      error: data?.message || `Upload failed: ${response.status}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
};
