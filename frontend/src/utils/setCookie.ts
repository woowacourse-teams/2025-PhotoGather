export const setCookie = async (
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
};
