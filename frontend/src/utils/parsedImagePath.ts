import { DEBUG_MESSAGES } from '../constants/debugMessages';

export const parsedImagePath = (path: string): string => {
  const cleanPath = path.split('?')[0];
  const segments = cleanPath.split('/');
  const lastSegment = segments.pop();

  if (!lastSegment) {
    console.warn(DEBUG_MESSAGES.NO_FILE_NAME);
    return '';
  }

  const parts = lastSegment.split('.');
  const ext = parts.pop()?.toLowerCase();
  const supportedExtensions = ['jpg', 'jpeg', 'png'];
  if (!ext || !supportedExtensions.includes(ext)) {
    console.warn(DEBUG_MESSAGES.NO_FILE_NAME);
    return '';
  }

  const fileName = parts.join('.');
  return fileName;
};
