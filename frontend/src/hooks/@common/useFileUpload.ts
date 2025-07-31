import { useState } from 'react';
import { photoService } from '../../apis/services/photo.service';
import { isValidFileType } from '../../utils/isValidFileType';

interface FileUploadProps {
  fileType: string;
}

const useFileUpload = ({ fileType }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const MAX_FILE_COUNT = 500;
  const DISALLOWED_FILE_TYPES = ['image/gif'];

  const addPreviewUrlsFromFiles = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const partitionValidFilesByType = (files: File[], type: string) => {
    return files.reduce(
      (acc, file) => {
        isValidFileType(file, type, DISALLOWED_FILE_TYPES)
          ? acc.validFiles.push(file)
          : acc.invalidFiles.push(file);
        return acc;
      },
      { validFiles: [] as File[], invalidFiles: [] as File[] },
    );
  };

  const isUnderUploadLimit = (validFiles: File[]) =>
    validFiles.length <= MAX_FILE_COUNT;

  const isInvalidFiles = (invalidFiles: File[]) => invalidFiles.length > 0;

  const updateFiles = (rawFiles: File[]) => {
    const { validFiles, invalidFiles } = partitionValidFilesByType(
      rawFiles,
      fileType,
    );

    if (!isUnderUploadLimit(validFiles)) {
      setErrorMessage(`한 번에 ${MAX_FILE_COUNT}장까지 올릴 수 있어요`);
    }
    if (isInvalidFiles(invalidFiles)) {
      setErrorMessage(
        `이미지 파일만 업로드 가능해요. 파일을 다시 확인해주세요.\n${invalidFiles
          .map((file) => file.name)
          .join('\n')}`,
      );
    }
    const limitedValidFiles = validFiles.slice(0, MAX_FILE_COUNT);
    setFiles((prev) => [...prev, ...limitedValidFiles]);
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
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviewUrls([]);
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      await photoService.uploadFiles('1234567890', files);
      clearFiles();
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('사진 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    files,
    previewUrls,
    isUploading,
    errorMessage,
    handleUpload,
    handleFilesUploadClick,
    handleFilesDrop,
  };
};

export default useFileUpload;
