export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  method: Method;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, unknown>;
  token?: string;
}

export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse
  | NetworkErrorResponse;

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  error: {
    type: 'http';
    status: number;
    message: string;
  };
}

interface NetworkErrorResponse {
  success: false;
  error: {
    type: 'network';
    message: string;
  };
}
