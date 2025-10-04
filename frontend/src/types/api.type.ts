export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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
