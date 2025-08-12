import { ERROR } from '../constants/messages';

export const checkSelectedPhotoExist = (photoIds: number[]) => {
  if (photoIds.length === 0) {
    throw new Error(ERROR.DOWNLOAD.NO_SELECTED_PHOTO);
  }
};
