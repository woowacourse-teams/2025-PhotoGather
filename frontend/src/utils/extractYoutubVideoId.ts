export const extractYoutubeVideoId = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace('www.', '');

    const v = parsed.searchParams.get('v');
    if (v) return v;

    if (hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1);
      return id || '';
    }

    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/embed/')[1] || '';
    }

    if (parsed.pathname.startsWith('/shorts/')) {
      return parsed.pathname.split('/shorts/')[1] || '';
    }

    return '';
  } catch {
    return '';
  }
};
