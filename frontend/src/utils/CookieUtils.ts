export const CookieUtils = {
  has: (name: string): boolean => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    return cookies.some((cookie) =>
      cookie.startsWith(`${encodeURIComponent(name)}=`),
    );
  },

  get: (name: string): string | null => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${encodeURIComponent(name)}=`)) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  },

  set: (
    name: string,
    value: string,
    options: {
      path?: string;
      secure?: boolean;
      sameSite?: 'Lax' | 'Strict' | 'None';
      expires?: Date;
      domain?: string;
    } = {},
  ): void => {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.path) cookieStr += `; path=${options.path}`;
    if (options.secure) cookieStr += `; secure`;
    if (options.sameSite) cookieStr += `; SameSite=${options.sameSite}`;
    if (options.expires)
      cookieStr += `; expires=${options.expires.toUTCString()}`;
    if (options.domain) cookieStr += `; domain=${options.domain}`;

    // biome-ignore lint/suspicious/noDocumentCookie: 동기적 작동
    document.cookie = cookieStr;
  },

  delete: (
    name: string,
    options: {
      path?: string;
      domain?: string;
    } = {},
  ): void => {
    let cookieStr = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    if (options.path) cookieStr += `; path=${options.path}`;
    if (options.domain) cookieStr += `; domain=${options.domain}`;

    // biome-ignore lint/suspicious/noDocumentCookie: 동기적 작동
    document.cookie = cookieStr;
  },
};
