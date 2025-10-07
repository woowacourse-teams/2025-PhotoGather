import { useState } from 'react';
import { CONSTRAINTS } from '../../constants/constraints';
import { heicToJpegBlob, isHeic } from '../../utils/heic';
import { useToast } from './useToast';

interface UseLocalFileProps {
  fileType: string;
  maxFileCount?: number;
}

interface LocalFile {
  id: number;
  originFile: File;
  previewUrl: string;
}

const isValidFileType = (file: File, expectedType: string): boolean => {
  return file.type.startsWith(`${expectedType}/`);
};

const useLocalFileTmp = ({
  fileType,
  maxFileCount = CONSTRAINTS.MAX_FILE_COUNT,
}: UseLocalFileProps) => {
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const { showToast } = useToast();

  const previewFile = localFiles.map((file) => ({
    id: file.id,
    previewUrl: file.previewUrl,
  }));

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
      return URL.createObjectURL(file);
    }
  };

  const addPreviewUrlsFromFiles = async (files: File[]) => {
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
      })),
    );

    setLocalFiles((prev) => [...prev, ...tmpFiles]);
  };

  const splitValidFilesByType = (files: File[], type: string) => {
    return files.reduce(
      (acc, file) => {
        if (isValidFileType(file, type)) {
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

      if (invalidFiles.length > 0) {
        alert('이미지 파일만 업로드 가능해요. 파일을 다시 확인해주세요.');
        return;
      }

      if (validFiles.length === 0) {
        return;
      }

      const availableSlots = maxFileCount - localFiles.length;
      if (validFiles.length > availableSlots) {
        showToast({
          text: `최대 ${maxFileCount}장까지만 업로드할 수 있어요.`,
        });
      }

      await addPreviewUrlsFromFiles(validFiles);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
      alert('파일 업로드에 실패했어요. 다시 시도해주세요.');
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
  };

  const handleFilesDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    const files = Array.from(event.dataTransfer.files || []);
    updateFiles(files);
  };

  const clearFiles = () => {
    for (const file of localFiles) {
      URL.revokeObjectURL(file.previewUrl);
    }
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

export default useLocalFileTmp;
