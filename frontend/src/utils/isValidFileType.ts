export const isValidFileType = (file: File, expectedType: string): boolean => {
  return file.type.startsWith(`${expectedType}/`);
};
