export const buildThumbnailUrl = (
  spaceCode: string,
  fileName: string,
  preset: string,
) => {
  return `${process.env.IMAGE_BASE_URL}/photogather/dev/contents/${spaceCode}/thumbnails/${fileName}_${preset}.webp`;
};
