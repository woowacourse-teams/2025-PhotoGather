export const buildThumbnailUrl = (
  spaceId: number,
  fileName: string,
  preset: string,
) => {
  return `${process.env.IMAGE_BASE_URL}/photogather/contents/${spaceId}/thumbnails/${fileName}_${preset}.webp`;
};
