export const buildImageUrl = (path: string): string => {
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || '';

  const parsedPath = path.replace(/^photogather\//, '');

  return `${baseUrl}/${parsedPath}`;
};
