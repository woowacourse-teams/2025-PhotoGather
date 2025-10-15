type ReplacePath = 'product' | 'guestbook' | 'space';

export const buildThumbnailUrl = (
  path: string,
  replacePath: ReplacePath,
  preset = '800',
): string => {
  const lastDotIndex = path.lastIndexOf('.');
  const pathWithoutExt =
    lastDotIndex !== -1 ? path.substring(0, lastDotIndex) : path;

  const thumbnailPath = pathWithoutExt.replace(
    `/${replacePath}/`,
    `/${replacePath}/thumbnails/`,
  );

  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || '';
  return `${baseUrl}${thumbnailPath}_x${preset}.webp`;
};
