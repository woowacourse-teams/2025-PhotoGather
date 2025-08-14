export const buildThumbnailUrl = (
  spaceCode: string,
  fileName: string,
  preset: string,
) => {
  if (process.env.ENVIRONMENT === 'development')
    return `${process.env.IMAGE_BASE_URL}/photogather/dev/contents/${spaceCode}/thumbnails/${fileName}_${preset}.webp`;
  return `${process.env.IMAGE_BASE_URL}/photogather/contents/${spaceCode}/thumbnails/${fileName}_${preset}.webp`;
};

export const buildOriginalImageUrl = (fileName: string) => {
  return `${process.env.IMAGE_BASE_URL}/${fileName}`;
};
