export const buildThumbnailUrl = (
  spaceCode: string,
  fileName: string,
  preset: string,
) => {
  return `${process.env.IMAGE_BASE_URL}/${spaceCode}/thumbnails/${fileName}_${preset}.webp`;
};

export const buildOriginalImageUrl = (imagePath: string) => {
  return `${process.env.IMAGE_BASE_URL}/${imagePath}`;
};
