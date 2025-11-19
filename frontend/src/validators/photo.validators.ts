import { CONSTRAINTS } from '../constants/constraints';

const MAX_FILE_CAPACITY_IN_MB = Math.floor(
  CONSTRAINTS.MAX_FILE_CAPACITY / (1024 * 1024),
);

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

export const checkFileCapacity = (files: File[]) => {
  const hasInvalidCapacity = files.some((file) => !isValidCapacity(file));
  if (hasInvalidCapacity) {
    throw new Error(
      `빈 파일은 업로드할 수 없으며, 최대 ${MAX_FILE_CAPACITY_IN_MB}MB 이하만 업로드할 수 있어요.`,
    );
  }
};

export const isValidFileType = (
  file: File,
  expectedType: string,
  allowedTypes: readonly string[] = [],
): boolean => {
  if (allowedTypes.length === 0) {
    return file.type.startsWith(`${expectedType}/`);
  }
  return (
    file.type.startsWith(`${expectedType}/`) && allowedTypes.includes(file.type)
  );
};

export const isValidCapacity = (
  file: File,
  maxCapacity: number = CONSTRAINTS.MAX_FILE_CAPACITY,
): boolean => {
  return file.size <= maxCapacity && file.size > 0;
};
