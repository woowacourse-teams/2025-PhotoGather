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

// IMAGE_BASE_URL=https://d2dzpk5q88o697.cloudfront.net/dev/contents
