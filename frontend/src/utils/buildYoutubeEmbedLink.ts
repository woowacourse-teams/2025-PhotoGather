import { extractYoutubeVideoId } from './extractYoutubVideoId';

export const buildYoutubeEmbedLink = (youtubeUrl: string) => {
  if (youtubeUrl.includes('embed')) {
    return youtubeUrl;
  }

  const videoId = extractYoutubeVideoId(youtubeUrl);
  return `https://www.youtube.com/embed/${videoId}`;
};
