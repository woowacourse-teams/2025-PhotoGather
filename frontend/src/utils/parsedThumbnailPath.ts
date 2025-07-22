export const parsedImagePath = (path: string) => {
  const reg = /(.*)(.png|.jpg|.jpeg)/;
  const pathWithoutExtension = path.split(reg)[1];
  return pathWithoutExtension.split('/').pop();
};
