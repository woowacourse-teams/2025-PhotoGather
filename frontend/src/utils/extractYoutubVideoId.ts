export const extractYoutubeVideoId = (url: string): string | null => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtube.com')) {
      return parsed.searchParams.get('v');
    }

    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1);
    }

    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/embed/')[1];
    }

    return null;
  } catch {
    return null;
  }
};
