export const isValidFileType = (
  file: File,
  expectedType: string,
  disallowedTypes: readonly string[] = [],
): boolean => {
  console.log(file.type);
  return (
    file.type.startsWith(`${expectedType}/`) &&
    !disallowedTypes.includes(file.type)
  );
};
