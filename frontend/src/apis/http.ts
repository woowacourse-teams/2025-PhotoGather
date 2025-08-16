import * as Sentry from '@sentry/react';
import { HTTP_STATUS_MESSAGES } from '../constants/errors';
import type {
  ApiResponse,
  BodyContentType,
  requestOptionsType,
} from '../types/api.type';
import { HttpError } from '../types/error.type';
import { makeSentryRequestContext } from '../utils/sentry/sentryRequestContext';
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

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: requestBody,
    });

    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/zip')) {
      const blob = await response.blob();
      return {
        success: response.ok,
        data: blob as unknown as T,
        error: !response.ok ? `Error: ${response.status}` : undefined,
      };
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const errorMessage = `[ErrorCode ${response.status}] ${
        data?.message ? data.message : HTTP_STATUS_MESSAGES[response.status]
      }`;
      const error = new Error(errorMessage);

      const sentryContext = makeSentryRequestContext(
        url,
        method,
        headers,
        requestBody,
      );
      Sentry.captureException(error, (scope) => {
        scope.setContext('http', {
          ...sentryContext,
        });

        return scope;
      });
      throw new HttpError(response.status, errorMessage);
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new Error(`네트워크 에러가 발생했습니다. 다시 시도해 주세요.`);
    }
    throw error;
  }
};

export const http = {
  get: <T>(
    endpoint: string,
    params?: Record<string, unknown>,
    bodyContentType?: BodyContentType,
    token?: string,
  ) =>
    request<T>(endpoint, {
      method: 'GET',
      params,
      bodyContentType,
      token,
    }),

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

  delete: <T>(
    endpoint: string,
    body?: unknown,
    bodyContentType: BodyContentType = 'json',
    token?: string,
  ) => request<T>(endpoint, { method: 'DELETE', body, bodyContentType, token }),
};
