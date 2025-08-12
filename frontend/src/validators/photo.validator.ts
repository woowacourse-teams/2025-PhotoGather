import { CONSTRAINTS } from '../constants/constraints';
import { ERROR } from '../constants/messages';

// TODO : 접두어 뭘로 할까~ validate-
export const checkSelectedPhotoExist = (photoIds: number[]) => {
  if (photoIds.length === 0) {
    throw new Error(ERROR.DOWNLOAD.NO_SELECTED_PHOTO);
  }
};

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
