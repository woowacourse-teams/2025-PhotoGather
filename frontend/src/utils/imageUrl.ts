export const buildThumbnailUrl = (
  spaceCode: string,
  path: string,
  preset = '800',
): string => {
  const lastDotIndex = path.lastIndexOf('.');
  const fileName = lastDotIndex !== -1 ? path.substring(0, lastDotIndex) : path;

  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || '';

  return `${baseUrl}/${spaceCode}/thumbnails/${fileName}_${preset}.webp`;
};
