import type {
  ApiResponse,
  BodyContentType,
  requestOptionsType,
} from '../types/api.type';
import { makeSentryRequestContext } from '../utils/sentry';
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

  const response = await fetch(url, {
    method,
    headers,
    body: requestBody,
  });
  // TODO: response가 없는 경우 (단순 네트워크 에러) 대응 - Failed To Fetch

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
    const statusMessages: Record<number, string> = {
      400: '요청 형식이 올바르지 않습니다.',
      401: '인증이 필요합니다.',
      403: '접근 권한이 없습니다.',
      404: '존재하지 않는 리소스입니다.',
      500: '서버 오류가 발생했습니다.',
      502: '서버 통신에 문제가 발생했습니다.',
      503: '서버가 일시적으로 장애가 발생했습니다.',
    };

    const message =
      statusMessages[response.status] || `Error: ${response.status}`;

    const err = new Error(message) as Error & {
      sentryContext?: Record<string, unknown>;
    };

    err.sentryContext = {
      request: makeSentryRequestContext(url, method, headers, requestBody),
    };

    throw err;
  }

  return {
    success: true,
    data: data as T,
  };
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
