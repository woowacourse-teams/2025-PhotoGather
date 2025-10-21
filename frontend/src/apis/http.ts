import * as Sentry from '@sentry/react';
import type { ApiResponse, RequestOptions } from '../types/api.type';
import { HttpError } from '../types/error.type';
import { createQueryString } from '../utils/createQueryString';
import { BASE_URL } from './config';
import { matchBody, matchHeaders } from './helper';
import { retryAuth } from './refresh';

const request = async <T>(
  endpoint: string,
  options: RequestOptions,
): Promise<ApiResponse<T>> => {
  const { method, body, params, headers, token } = options;
  const url = `${BASE_URL}${endpoint}${createQueryString(params)}`;

  let traceId = '';

  const doFetch = async (newToken?: string) => {
    const requestHeaders = matchHeaders({
      body,
      headers: headers ?? {},
      method,
      token: newToken ?? token,
    });
    traceId = requestHeaders['trace-id'];

    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: matchBody(body),
    });
    return response;
  };

  try {
    let response = await doFetch();
    if (response.status === 401) {
      try {
        response = await retryAuth(doFetch);
      } catch (error) {
        if (error instanceof HttpError) {
          Sentry.captureException(error, {
            tags: {
              error_type: 'auth_retry_failed',
              status_code: error.status,
              trace_id: traceId,
            },
            extra: {
              url,
              method,
              traceId,
              body,
            },
          });

          return {
            success: false,
            error: {
              type: 'http',
              status: error.status,
              message: error.message,
            },
          };
        }
      }
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      const httpError = new Error(
        data?.message || `HTTP Error: ${response.status}`,
      );

      Sentry.captureException(httpError, {
        tags: {
          error_type: 'http_error',
          status_code: response.status,
          trace_id: traceId,
        },
        extra: {
          method,
          url,
          traceId,
          body,
        },
        level: response.status >= 500 ? 'error' : 'warning',
      });

      return {
        success: false,
        error: {
          type: 'http',
          status: response.status,
          message:
            data?.message || `Error: response status is ${response.status}`,
        },
      };
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    const networkError =
      error instanceof Error ? error : new Error('Network error');

    Sentry.captureException(networkError, {
      tags: {
        error_type: 'network_error',
        endpoint,
        trace_id: traceId,
      },
      extra: {
        method,
        url,
        traceId,
        body,
      },
    });

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
  get: <T>(
    endpoint: string,
    params?: Record<string, unknown>,
    token?: string | undefined,
  ) => request<T>(endpoint, { method: 'GET', params, token }),

  post: <T>(endpoint: string, body?: unknown, token?: string) =>
    request<T>(endpoint, { method: 'POST', body, token }),

  put: <T>(endpoint: string, body?: unknown, token?: string) =>
    request<T>(endpoint, { method: 'PUT', body, token }),

  patch: <T>(endpoint: string, body?: unknown, token?: string) =>
    request<T>(endpoint, { method: 'PATCH', body, token }),

  delete: <T>(endpoint: string, body?: unknown, token?: string) =>
    request<T>(endpoint, { method: 'DELETE', body, token }),
};
