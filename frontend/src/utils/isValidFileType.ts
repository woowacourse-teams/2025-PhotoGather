export const isValidFileType = (
  file: File,
  expectedType: string,
  disallowedTypes: string[] = [],
): boolean => {
  return (
    file.type.startsWith(`${expectedType}/`) &&
    !disallowedTypes.includes(file.type)
  );
};
