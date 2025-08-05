export const isValidFileType = (
  file: File,
  expectedType: string,
  disallowedTypes: readonly string[] = [],
): boolean => {
  return (
    file.type.startsWith(`${expectedType}/`) &&
    !disallowedTypes.includes(file.type)
  );
};
