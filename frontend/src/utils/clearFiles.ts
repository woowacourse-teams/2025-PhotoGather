import type { LocalFile } from '../types/file.type';

export const clearFiles = (localFiles: LocalFile[]) => {
  for (const file of localFiles) {
    URL.revokeObjectURL(file.previewUrl);
  }
};
