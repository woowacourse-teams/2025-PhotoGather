import { CONSTRAINTS } from '../constants/constraints';

export const checkUploadLimit = (validFiles: File[]) => {
  if (validFiles.length > CONSTRAINTS.MAX_FILE_COUNT) {
    throw new Error(
      `한 번에 ${CONSTRAINTS.MAX_FILE_COUNT}장까지 올릴 수 있어요`,
    );
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
