import { useState } from 'react';
import { CONSTRAINTS } from '../../constants/constraints';
import type { LocalFile, PreviewFile } from '../../types/file.type';
import { heicToJpegBlob, isHeic } from '../../utils/heic';
import {
  checkFileCapacity,
  checkInvalidFileType,
  checkUploadLimit,
  isValidFileType,
} from '../../validators/photo.validators';
import { useToast } from './useToast';

interface UseLocalFileProps {
  initialLocalFiles?: LocalFile[];
  fileType: string;
  maxFileCount?: number;
}
const useLocalFile = ({
  initialLocalFiles,
  fileType,
  maxFileCount = CONSTRAINTS.MAX_FILE_COUNT,
}: UseLocalFileProps) => {
  const [localFiles, setLocalFiles] = useState<LocalFile[]>(
    initialLocalFiles ?? [],
  );
  const { showToast } = useToast();

  const previewFiles = localFiles.map(
    (file) =>
      ({
        id: file.id,
        previewUrl: file.previewUrl,
      }) as PreviewFile,
  );

  const processFile = async (file: File) => {
    const isAndroidChrome =
      /Android/i.test(navigator.userAgent) &&
      /Chrome/i.test(navigator.userAgent);

    if (isAndroidChrome) {
      const buf = await file.arrayBuffer();
      return new File([buf], file.name, { type: file.type });
    }
    return file;
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
      setLocalFiles([]);
      return URL.createObjectURL(file);
    }
  };

  const replaceSingleFile = async (file: File) => {
    const processedFile = await processFile(file);
    const newFile: LocalFile = {
      id: 0,
      originFile: processedFile,
      previewUrl: await createImagePreviewUrl(processedFile),
      capacityValue: processedFile.size,
      capturedAt: null,
    };

    setLocalFiles((prev) => {
      for (const prevFile of prev) {
        URL.revokeObjectURL(prevFile.previewUrl);
      }
      return [newFile];
    });
  };

  const addPreviewUrlsFromFiles = async (files: File[]) => {
    if (maxFileCount === 1) {
      await replaceSingleFile(files[0]);
      return;
    }

    const startIndex = localFiles.length;
    const availableSlots = maxFileCount - localFiles.length;
    const filesToAdd = files.slice(0, availableSlots);

    const processedFiles = await Promise.all(
      filesToAdd.map((file) => processFile(file)),
    );

    const tmpFiles: LocalFile[] = await Promise.all(
      processedFiles.map(async (file, index) => ({
        id: startIndex + index,
        originFile: file,
        previewUrl: await createImagePreviewUrl(file),
        capacityValue: file.size,
        capturedAt: null,
      })),
    );

    setLocalFiles((prev) => [...prev, ...tmpFiles]);
  };

  const splitValidFilesByType = (files: File[], type: string) => {
    return files.reduce(
      (acc, file) => {
        if (isValidFileType(file, type, CONSTRAINTS.ALLOWED_FILE_TYPES)) {
          acc.validFiles.push(file);
        } else {
          acc.invalidFiles.push(file);
        }
        return acc;
      },
      { validFiles: [] as File[], invalidFiles: [] as File[] },
    );
  };

  const updateFiles = async (rawFiles: File[]) => {
    try {
      const { validFiles, invalidFiles } = splitValidFilesByType(
        rawFiles,
        fileType,
      );

      checkInvalidFileType(invalidFiles);
      checkFileCapacity(validFiles);

      if (validFiles.length === 0) return;

      await addPreviewUrlsFromFiles(validFiles);
      if (maxFileCount !== 1)
        checkUploadLimit(validFiles, maxFileCount, localFiles.length);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
      showToast({
        text:
          error instanceof Error
            ? error.message
            : '파일 업로드 중 오류가 발생했습니다.',
      });
    }
  };

  const deleteFile = (id: number) => {
    setLocalFiles((prev) => {
      const deleted = prev.find((item) => item.id === id);
      if (deleted) {
        URL.revokeObjectURL(deleted.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleFilesUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    updateFiles(files);
    event.target.value = '';
  };

  const handleFilesDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    const files = Array.from(event.dataTransfer.files || []);
    updateFiles(files);
  };

  const clearLocalFiles = () => {
    setLocalFiles([]);
  };

  return {
    localFiles,
    previewFiles,
    deleteFile,
    handleFilesUploadClick,
    handleFilesDrop,
    clearLocalFiles,
  };
};

export default useLocalFile;
