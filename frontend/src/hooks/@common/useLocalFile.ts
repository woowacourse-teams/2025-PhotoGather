import { useState } from 'react';
import { photoService } from '../../apis/services/photo.service';
import { CONSTRAINTS } from '../../constants/constraints';
import type { LocalFile } from '../../types/file.type';
import { isValidFileType } from '../../utils/isValidFileType';
import {
  checkInvalidFileType,
  checkUploadLimit,
} from '../../validators/photo.validator';
import useError from './useError';

interface UseFileUploadProps {
  spaceCode: string;
  fileType: string;
  onUploadSuccess?: () => void;
}

const useLocalFile = ({
  spaceCode,
  fileType,
  onUploadSuccess,
}: UseFileUploadProps) => {
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const previewFile = localFiles.map((file) => ({
    id: file.id,
    previewUrl: file.previewUrl,
  }));
  const [isUploading, setIsUploading] = useState(false);

  const addPreviewUrlsFromFiles = (files: File[]) => {
    const startIndex = localFiles.length;
    const tmpFiles = files.map((file, index) => ({
      id: startIndex + index,
      originFile: file,
      previewUrl: URL.createObjectURL(file),
    }));

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

  const { tryTask, tryFetch } = useError();

  const fetchUploadFiles = async () => {
    const files = localFiles.map((file) => file.originFile);
    await photoService.uploadFiles(spaceCode, files);
  };

  const errorOption = {
    toast: {
      text: '사진 업로드에 실패했습니다',
    },
    afterAction: {
      action: () => {
        setIsUploading(false);
      },
    },
  };

  const submitFileUpload = async () => {
    await tryFetch({
      task: async () => {
        setIsUploading(true);
        await fetchUploadFiles();
        onUploadSuccess?.();
        clearFiles();
      },
      errorActions: ['toast', 'afterAction'],
      context: errorOption,
      onFinally: () => {
        setIsUploading(false);
      },
    });
  };

  const deleteFile = (id: number) => {
    setLocalFiles((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      const deleted = prev.find((item) => item.id === id);
      if (deleted) URL.revokeObjectURL(deleted.previewUrl);
      return updated;
    });
  };

  return {
    previewFile,
    isUploading,
    submitFileUpload,
    deleteFile,
    handleFilesUploadClick,
    handleFilesDrop,
  };
};

export default useLocalFile;
