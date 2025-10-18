export const matchBody = (body: unknown) => {
  if (!body) {
    return undefined;
  }
  if (body instanceof FormData) {
    return body;
  }
  return JSON.stringify(body);
};

export const matchHeaders = (
  body: unknown,
  headers: Record<string, string>,
  token?: string,
) => {
  const mergedHeaders = { ...headers };
  if (body instanceof FormData) {
    delete mergedHeaders['Content-Type'];
    delete mergedHeaders['content-type'];
  } else {
    mergedHeaders['Content-Type'] =
      mergedHeaders['Content-Type'] ?? 'application/json';
  }
  if (token) {
    mergedHeaders['Authorization'] = `Bearer ${token}`;
  }

  return mergedHeaders;
};
