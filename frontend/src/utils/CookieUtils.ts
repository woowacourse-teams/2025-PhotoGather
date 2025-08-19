export const CookieUtils = {
  has: (name: string) => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    return cookies.some((cookie) => cookie.startsWith(`${name}=`));
  },

  get: async (name: string): Promise<string | null> => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${encodeURIComponent(name)}=`))
        return decodeURIComponent(cookie.substring(name.length + 1));
    }
    return null;
  },

  set: async (
    name: string,
    value: string,
    options: {
      path?: string;
      secure?: boolean;
      sameSite?: 'Lax' | 'Strict' | 'None';
    } = {},
  ) => {
    if ('cookieStore' in window) {
      try {
        await window.cookieStore.set({
          name: name,
          value: value,
          path: options.path,
        });
      } catch (error) {
        console.error(`Failed to set cookie "${name}":`, error);
      }
    } else {
      let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      if (options.path) cookieStr += `; path=${options.path}`;
      if (options.secure) cookieStr += `; secure`;
      if (options.sameSite) cookieStr += `; sameSite=${options.sameSite}`;
      // biome-ignore lint/suspicious/noDocumentCookie: cookieStore를 지원하지 않는 레거시 브라우저를 위한 대체(fallback) 로직
      document.cookie = cookieStr;
    }
  },

  delete: async (
    name: string,
    options: {
      path?: string;
      domain?: string;
    } = {},
  ) => {
    if ('cookieStore' in window) {
      try {
        await window.cookieStore.delete({ name });
      } catch (error) {
        console.error(`Failed to delete cookie "${name}":`, error);
      }
    } else {
      let cookieStr = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      if (options.path) cookieStr += `; path=${options.path}`;
      if (options.domain) cookieStr += `; domain=${options.domain}`;
      // biome-ignore lint/suspicious/noDocumentCookie: cookieStore를 지원하지 않는 레거시 브라우저를 위한 대체(fallback) 로직
      document.cookie = cookieStr;
    }
  },
};
