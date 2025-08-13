import { useState } from 'react';
import { photoService } from '../../apis/services/photo.service';
import { CONSTRAINTS } from '../../constants/constraints';
import type { PreviewFile, UploadFile } from '../../types/file.type';
import { isValidFileType } from '../../utils/isValidFileType';
import {
  checkInvalidFileType,
  checkUploadLimit,
} from '../../validators/photo.validator';
import useApiCall from './useApiCall';
import useError from './useError';

interface UseFileUploadProps {
  spaceCode: string;
  fileType: string;
  onUploadSuccess?: () => void;
}

const useFileUpload = ({
  spaceCode,
  fileType,
  onUploadSuccess,
}: UseFileUploadProps) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [previewData, setPreviewData] = useState<PreviewFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { safeApiCall } = useApiCall();

  const addPreviewUrlsFromFiles = (files: File[]) => {
    const startIndex = previewData.length;
    const urls = files.map((file, index) => ({
      id: startIndex + index,
      path: URL.createObjectURL(file),
    }));

    const tmpFiles = files.map((file, index) => ({
      id: startIndex + index,
      originFile: file,
    }));

    setPreviewData((prev) => [...prev, ...urls]);
    setUploadFiles((prev) => [...prev, ...tmpFiles]);
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

  const updateFiles = (rawFiles: File[]) => {
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
    previewData.forEach((data) => URL.revokeObjectURL(data.path));
    setUploadFiles([]);
    setPreviewData([]);
  };

  const { tryTask } = useError();

  const fetchUploadFiles = async () => {
    const files = uploadFiles.map((file) => file.originFile);
    await safeApiCall(() => photoService.uploadFiles(spaceCode, files));
  };

  const errorOption = {
    toast: {
      text: '사진 업로드에 실패했습니다',
    },
    afterAction: () => {
      setIsUploading(false);
    },
  };

  const submitFileUpload = async () => {
    await tryTask({
      task: async () => {
        setIsUploading(true);
        await fetchUploadFiles();
        onUploadSuccess?.();
      },
      errorActions: ['toast', 'afterAction'],
      context: errorOption,
      onFinally: () => {
        clearFiles();
        setIsUploading(false);
      },
    });
  };

  const deleteFile = (id: number) => {
    setPreviewData((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      const deleted = prev.find((item) => item.id === id);
      if (deleted) URL.revokeObjectURL(deleted.path);
      return updated;
    });

    setUploadFiles((prev) => {
      return prev.filter((file) => file.id !== id);
    });
  };

  return {
    uploadFiles,
    previewData,
    isUploading,
    submitFileUpload,
    deleteFile,
    handleFilesUploadClick,
    handleFilesDrop,
  };
};

export default useFileUpload;
