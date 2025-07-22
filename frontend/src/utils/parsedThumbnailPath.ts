import { DEBUG_MESSAGES } from '../constants/debugMessages';

export const parsedImagePath = (path: string): string => {
  const reg = /(.*)(.png|.jpg|.jpeg)/;
  const pathWithoutExtension = path.split(reg)[1];
  const fileName = pathWithoutExtension.split('/').pop();
  if (!fileName) {
    console.warn(DEBUG_MESSAGES.NO_FILE_NAME);
    return '';
  }
  return fileName;
};
