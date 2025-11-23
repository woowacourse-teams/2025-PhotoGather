import { extractYoutubeVideoId } from './extractYoutubVideoId';

const QualityMap = {
  low: 'default',
  medium: 'hqdefault',
  high: 'maxresdefault',
} as const;

type Quality = keyof typeof QualityMap;

export const buildYoutubeThumbnail = (
  videoUrl: string,
  quality: Quality = 'medium',
): string => {
  if (!videoUrl) return '';
  const videoId = extractYoutubeVideoId(videoUrl);
  return `https://img.youtube.com/vi/${videoId}/${QualityMap[quality]}.jpg`;
};
