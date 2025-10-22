import * as Sentry from '@sentry/react';

interface CaptureSentryErrorProps {
  error: unknown;
  traceId?: string;
  url: string;
  method: string;
  body?: unknown;
  headers?: HeadersInit;
  statusCode?: number | string;
  errorType: 'network_error' | 'http_error' | 'auth_retry_failed';
  level?: 'error' | 'warning' | 'info';
}

export const captureSentryError = ({
  error,
  traceId,
  url,
  method,
  body,
  headers,
  statusCode,
  errorType,
  level = 'error',
}: CaptureSentryErrorProps) => {
  const exception =
    error instanceof Error
      ? error
      : new Error(String(error ?? 'Unknown error'));

  // body가 너무 크면 일부만 기록 (Sentry 전송 제한 대비)
  const safeBody =
    typeof body === 'string'
      ? body.slice(0, 500)
      : JSON.stringify(body)?.slice(0, 500);

  Sentry.captureException(exception, {
    level,
    tags: {
      error_type: errorType,
      status_code: String(statusCode ?? 'N/A'),
      trace_id: traceId ?? 'unknown',
    },
    extra: {
      method,
      url,
      traceId,
      body: safeBody,
    },
    contexts: {
      request: {
        url,
        method,
        headers,
        body: safeBody,
        traceId,
      },
      environment: {
        base_url: window?.location?.origin ?? '',
        online: navigator.onLine,
        user_agent: navigator.userAgent,
      },
    },
  });
};
