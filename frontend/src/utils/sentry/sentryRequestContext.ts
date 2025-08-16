interface SentryRequestContext {
  url: string;
  method: string;
  headers: Record<string, unknown>;
  requestBody: Record<string, unknown> | undefined;
}

const DISALLOW_HEADERS = [
  'authorization',
  'cookie',
  'set-cookie',
  'x-api-key',
] as const;

const BODY_SENSITIVE_KEYS = [
  'password',
  'token',
  'secret',
  'email',
  'phone',
] as const;

const ALLOW_BODY_OPTIONS = {
  sensitiveKeys: BODY_SENSITIVE_KEYS,
  maxString: 200,
  maxArray: 20,
};

const parseBodyToObject = (body: BodyInit): Record<string, unknown> => {
  if (body instanceof FormData || body instanceof URLSearchParams) {
    return Object.fromEntries(body.entries());
  }

  if (
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    body instanceof ReadableStream ||
    ArrayBuffer.isView(body)
  ) {
    return { body: 'body is not allowed to log' };
  }

  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      if (parsed && typeof parsed === 'object') {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return { body: 'raw string (not JSON) is not logged' };
    }
  }

  if (typeof body === 'object' && body !== null) {
    return body;
  }

  return { body: 'body is not allowed to log' };
};

export const extractAllowedBody = (
  body: BodyInit,
  options: typeof ALLOW_BODY_OPTIONS,
): Record<string, unknown> | undefined => {
  const { sensitiveKeys, maxString, maxArray } = options;

  const result: Record<string, unknown> = {};
  const bodyObject = parseBodyToObject(body);

  for (const [key, value] of Object.entries(bodyObject)) {
    if (
      sensitiveKeys.includes(
        key.toLowerCase() as (typeof BODY_SENSITIVE_KEYS)[number],
      )
    ) {
      result[key] = '***';
      continue;
    }

    if (maxString && typeof value === 'string') {
      result[key] =
        value.length > maxString ? `${value.slice(0, maxString)}…` : value;
      continue;
    }

    if (maxArray && Array.isArray(value)) {
      result[key] = value.length > maxArray ? value.slice(0, maxArray) : value;
      continue;
    }

    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      result[key] = value;
      continue;
    }

    result[key] = maskObject(sensitiveKeys, value as Record<string, unknown>);
  }

  return result;
};

export const parseHeadersToObject = (headers: HeadersInit) => {
  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  return { ...headers };
};

export const maskObject = (
  sensitiveKeys: readonly string[],
  object: Record<string, unknown>,
): Record<string, unknown> => {
  const cloneObject = { ...object };
  for (const key of Object.keys(cloneObject)) {
    if (sensitiveKeys.includes(key.toLowerCase())) {
      cloneObject[key] = '***';
    }
  }

  return cloneObject;
};

export const makeSentryRequestContext = (
  url: string,
  method: string,
  headers: HeadersInit,
  requestBody: BodyInit | undefined,
): SentryRequestContext => {
  const requestContext = {
    url,
    method,
    headers: maskObject(DISALLOW_HEADERS, parseHeadersToObject(headers)),
    requestBody: requestBody
      ? extractAllowedBody(requestBody, ALLOW_BODY_OPTIONS)
      : undefined,
  };

  return requestContext;
};
