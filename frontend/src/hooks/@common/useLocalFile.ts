import * as exifr from 'exifr';
import { useState } from 'react';
import { CONSTRAINTS } from '../../constants/constraints';
import type { LocalFile } from '../../types/file.type';
import { heicToJpegBlob, isHeic } from '../../utils/heic';
import { isValidFileType } from '../../utils/isValidFileType';
import {
  checkInvalidFileType,
  checkUploadLimit,
} from '../../validators/photo.validator';
import useTaskHandler from './useTaskHandler';

interface UseLocalFileProps {
  fileType: string;
}

const useLocalFile = ({ fileType }: UseLocalFileProps) => {
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const previewFile = localFiles.map((file) => ({
    id: file.id,
    previewUrl: file.previewUrl,
  }));
  const { tryTask, tryFetch } = useTaskHandler();

  const extractDateTimeOriginal = async (file: File) => {
    const metadata = await exifr.parse(file, ['DateTimeOriginal']);
    return metadata?.DateTimeOriginal
      ? (metadata.DateTimeOriginal as Date).toISOString()
      : null;
  };

  const createImagePreviewUrl = async (file: File) => {
    if (isHeic(file)) {
      const { data } = await tryFetch({
        task: () => heicToJpegBlob(file),
        errorActions: ['toast'],
        context: {
          toast: {
            text: '사진을 불러오는데 실패했어요. 다시 시도해주세요.',
          },
        },
        loadingStateKey: 'imagePreviewUrl',
      });
      return URL.createObjectURL(data as Blob);
    } else {
      return URL.createObjectURL(file);
    }
  };

  const addPreviewUrlsFromFiles = async (files: File[]) => {
    const startIndex = localFiles.length;

    const tmpFiles = await Promise.all(
      files.map(async (file, index) => {
        const buf = await file.arrayBuffer();
        const cloned = new File([buf], file.name, { type: file.type });

        return {
          id: startIndex + index,
          originFile: cloned,
          capturedAt: await extractDateTimeOriginal(cloned),
          capacityValue: cloned.size,
          previewUrl: await createImagePreviewUrl(cloned),
        };
      }),
    );

    setLocalFiles((prev) => [...prev, ...tmpFiles]);
  };

  const splitValidFilesByType = (files: File[], type: string) => {
    return files.reduce(
      (acc, file) => {
        isValidFileType(file, type, CONSTRAINTS.NOT_ALLOWED)
          ? acc.validFiles.push(file)
          : acc.invalidFiles.push(file);
        return acc;
      },
      { validFiles: [] as File[], invalidFiles: [] as File[] },
    );
  };

  const updateFiles = async (rawFiles: File[]) => {
    const { validFiles, invalidFiles } = splitValidFilesByType(
      rawFiles,
      fileType,
    );

    tryTask({
      task: () => {
        checkInvalidFileType(invalidFiles);
        checkUploadLimit(validFiles);
      },
      errorActions: ['toast'],
    });

    const limitedValidFiles = validFiles.slice(0, CONSTRAINTS.MAX_FILE_COUNT);
    addPreviewUrlsFromFiles(limitedValidFiles);
  };

  const deleteFile = (id: number) => {
    setLocalFiles((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      const deleted = prev.find((item) => item.id === id);
      if (deleted) URL.revokeObjectURL(deleted.previewUrl);
      return updated;
    });
  };

  const handleFilesUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateFiles(Array.from(event.target.files || []));
  };

  const handleFilesDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    updateFiles(Array.from(event.dataTransfer.files || []));
  };

  const clearFiles = () => {
    localFiles.forEach((data) => URL.revokeObjectURL(data.previewUrl));
    setLocalFiles([]);
  };

  return {
    localFiles,
    previewFile,
    deleteFile,
    handleFilesUploadClick,
    handleFilesDrop,
    clearFiles,
  };
};

export default useLocalFile;
