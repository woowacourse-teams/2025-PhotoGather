export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface DefaultRequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, unknown>;
}

export interface RequestOptions extends DefaultRequestOptions {
  method: Method;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, unknown>;
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
