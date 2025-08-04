import { NETWORK } from '../constants/errors';
import type {
  ApiResponse,
  BodyContentType,
  requestOptionsType,
} from '../types/api.type';
import { isNetworkError } from '../utils/isNetworkError';
import { BASE_URL } from './config';
import { createBody } from './createBody';
import { createHeaders } from './createHeaders';

// const defaultHeaders: Record<string, string> = {};

// export const setAuthToken = (token: string | null) => {
//   if (token) {
//     defaultHeaders.Authorization = `Bearer ${token}`;
//   } else {
//     delete defaultHeaders.Authorization;
//   }
// };

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
  { method, body, params, bodyContentType = 'json', token }: requestOptionsType,
): Promise<ApiResponse<T>> => {
  const url = `${BASE_URL}${endpoint}${buildQueryString(params)}`;
  const headers = createHeaders(bodyContentType, token);
  const requestBody = createBody(body, bodyContentType);

  // TODO : try catch 유틸 분리
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: requestBody,
    });

    // zip 파일로 받고, 응답이 blob으로 오는 경우
    if (bodyContentType === 'blob') {
      const blob = await response.blob();
      return {
        success: response.ok,
        data: blob as unknown as T,
        error: !response.ok ? `Error: ${response.status}` : undefined,
      };
    }

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
      error: isNetworkError(error)
        ? NETWORK.DEFAULT
        : error instanceof Error
          ? error.message
          : 'Unknown error',
    };
  }
};

export const http = {
  get: <T>(
    endpoint: string,
    params?: Record<string, unknown>,
    bodyContentType?: BodyContentType,
    token?: string,
  ) => request<T>(endpoint, { method: 'GET', params, bodyContentType, token }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    bodyContentType: BodyContentType = 'json',
    token?: string,
  ) => request<T>(endpoint, { method: 'POST', body, bodyContentType, token }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    bodyContentType: BodyContentType = 'json',
    token?: string,
  ) => request<T>(endpoint, { method: 'PUT', body, bodyContentType, token }),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    bodyContentType: BodyContentType = 'json',
    token?: string,
  ) => request<T>(endpoint, { method: 'PATCH', body, bodyContentType, token }),

  delete: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, { method: 'DELETE', token }),
};
