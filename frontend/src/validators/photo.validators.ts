import { CONSTRAINTS } from '../constants/constraints';

export const checkUploadLimit = (
  validFiles: File[],
  maxFileCount: number = CONSTRAINTS.MAX_FILE_COUNT,
  currentFileCount: number = 0,
) => {
  const availableSlots = maxFileCount - currentFileCount;
  if (validFiles.length > availableSlots) {
    throw new Error(`최대 ${maxFileCount}장까지만 업로드할 수 있어요.`);
  }
};

export const checkInvalidFileType = (invalidFiles: File[]) => {
  if (invalidFiles.length > 0) {
    throw new Error('이미지 파일만 업로드 가능해요. 파일을 다시 확인해주세요.');
  }
};

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
