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

  const addPreviewUrlsFromFiles = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const partitionValidFilesByType = (files: File[], type: string) => {
    return files.reduce(
      (acc, file) => {
        isValidFileType(file, type)
          ? acc.validFiles.push(file)
          : acc.invalidFiles.push(file);
        return acc;
      },
      { validFiles: [] as File[], invalidFiles: [] as File[] },
    );
  };

  const checkValidFilesLength = (validFiles: File[], maxCount: number) => {
    if (validFiles.length > maxCount) {
      setErrorMessage(`한 번에 ${maxCount}장까지 올릴 수 있어요`);
    }
  };

  const checkInvalidFiles = (invalidFiles: File[]) => {
    if (invalidFiles.length > 0) {
      setErrorMessage(
        `이미지 파일만 업로드 가능해요. 파일을 다시 확인해주세요.\n${invalidFiles
          .map((file) => file.name)
          .join('\n')}`,
      );
    }
  };

  const handleFilesUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    const { validFiles, invalidFiles } = partitionValidFilesByType(
      files,
      fileType,
    );

    checkValidFilesLength(validFiles, 10);
    checkInvalidFiles(invalidFiles);
    const limitedValidFiles = validFiles.slice(0, 10);
    setFiles((prev) => [...prev, ...limitedValidFiles]);
    addPreviewUrlsFromFiles(limitedValidFiles);
  };

  const handleFilesDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    const files = Array.from(event.dataTransfer.files || []);
    const { validFiles, invalidFiles } = partitionValidFilesByType(
      files,
      fileType,
    );
    checkValidFilesLength(validFiles, 10);
    checkInvalidFiles(invalidFiles);
    const limitedValidFiles = validFiles.slice(0, 10);
    setFiles((prev) => [...prev, ...limitedValidFiles]);
    addPreviewUrlsFromFiles(limitedValidFiles);
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
