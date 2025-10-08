import * as exifr from 'exifr';
import { useState } from 'react';
import { CONSTRAINTS } from '../../constants/constraints';
import type { LocalFile } from '../../types/file.type';
import { heicToJpegBlob, isHeic } from '../../utils/heic';
import {
  checkInvalidFileType,
  checkUploadLimit,
  isValidFileType,
} from '../../validators/photo.validators';
import { useToast } from '../@common/useToast';

interface UseLocalFileProps {
  fileType: string;
  maxFileCount: number;
  appendForm?: (file: File[]) => void;
}

const useLocalFile = ({
  fileType,
  maxFileCount,
  appendForm,
}: UseLocalFileProps) => {
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const { showToast } = useToast();

  const previewFile = localFiles.map((file) => ({
    id: file.id,
    previewUrl: file.previewUrl,
  }));

  const extractDateTimeOriginal = async (file: File) => {
    const metadata = await exifr.parse(file, ['DateTimeOriginal']);
    return metadata?.DateTimeOriginal
      ? (metadata.DateTimeOriginal as Date).toISOString()
      : null;
  };

  const createImagePreviewUrl = async (file: File) => {
    if (!isHeic(file)) {
      return URL.createObjectURL(file);
    }
    try {
      const data = await heicToJpegBlob(file);
      return URL.createObjectURL(data as Blob);
    } catch (error) {
      showToast({
        text: '사진을 불러오는데 실패했어요. 다시 시도해주세요.',
      });
      console.error(error);
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

    if (maxFileCount === 1 && localFiles.length > 0) {
      clearFiles();
    }

    setLocalFiles((prev) => {
      if (appendForm) {
        appendForm(tmpFiles.map((file) => file.originFile));
      }
      return [...prev, ...tmpFiles];
    });
  };

  const splitValidFilesByType = (files: File[], type: string) => {
    return files.reduce(
      (acc, file) => {
        isValidFileType(file, type, CONSTRAINTS.NOT_ALLOWED_FILE_TYPES)
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

    try {
      checkInvalidFileType(invalidFiles);
      checkUploadLimit(validFiles);
    } catch (error) {
      if (error instanceof Error) {
        showToast({
          text: '사진 업로드 중 오류가 발생했어요.',
        });
      }
      console.error(error);
    }

    if (maxFileCount === 1 && localFiles.length > 0) {
      clearFiles();
    }

    const limitedValidFiles = validFiles.slice(0, maxFileCount);
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
    localFiles.forEach((data) => {
      URL.revokeObjectURL(data.previewUrl);
    });
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
