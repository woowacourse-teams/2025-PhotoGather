export const buildThumbnailUrl = (
  spaceCode: string,
  fileName: string,
  preset: string,
) => {
  const basePath =
    process.env.ENVIRONMENT === 'development'
      ? 'photogather/dev/contents'
      : 'photogather/contents';

  return `${process.env.IMAGE_BASE_URL}/${basePath}/${spaceCode}/thumbnails/${fileName}_${preset}.webp`;
};

export const buildOriginalImageUrl = (fileName: string) => {
  return `${process.env.IMAGE_BASE_URL}/${fileName}`;
};
