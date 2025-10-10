export const matchBody = (body: unknown) => {
  if (!body) {
    return undefined;
  }
  if (body instanceof FormData) {
    return body;
  }
  return JSON.stringify(body);
};

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
};

export const matchHeaders = (
  body: unknown,
  headers: Record<string, string>,
) => {
  if (body instanceof FormData) {
    const newHeaders = { ...headers };
    delete newHeaders['Content-Type'];
    delete newHeaders['content-type'];
    return newHeaders;
  }
  return {
    ...defaultHeaders,
    ...headers,
  };
};
