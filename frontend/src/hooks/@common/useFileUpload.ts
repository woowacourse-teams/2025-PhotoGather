import { useState } from 'react';
import { photoService } from '../../apis/services/photo.service';
import type { PreviewFile } from '../../types/file.type';
import { CONSTRAINTS } from './../../constants/constraints';
import { isValidFileType } from '../../utils/isValidFileType';

interface UseFileUploadProps {
  fileType: string;
}

const useFileUpload = ({ fileType }: UseFileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewData, setPreviewData] = useState<PreviewFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addPreviewDataFromFiles = (files: File[]) => {
    const startIndex = previewData.length;
    const urls = files.map((file, index) => ({
      id: startIndex + index,
      path: URL.createObjectURL(file),
    }));
    setPreviewData((prev) => [...prev, ...urls]);
  };

  const splitValidFilesByType = (files: File[], type: string) => {
    return files.reduce(
      (acc, file) => {
        isValidFileType(file, type, CONSTRAINTS.DISALLOWED_FILE_TYPES)
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
    const isUnderUploadLimit = validFiles.length <= CONSTRAINTS.MAX_FILE_COUNT;
    const hasInvalidFiles = invalidFiles.length > 0;

    if (!isUnderUploadLimit) {
      setErrorMessage(
        `한 번에 ${CONSTRAINTS.MAX_FILE_COUNT}장까지 올릴 수 있어요`,
      );
    setFiles((prev) => [...prev, ...validFiles]);
    addPreviewDataFromFiles(validFiles);
  };

  const handleFilesDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    const files = Array.from(event.dataTransfer.files || []);
    const { validFiles, invalidFiles } = partitionValidFilesByType(
      files,
      fileType,
    );
    if (invalidFiles.length > 0)
      setErrorMessage(
        `이미지 파일만 업로드 가능해요. 파일을 다시 확인해주세요.\n${invalidFiles
          .map((file) => file.name)
          .join('\n')}`,
      );
    }
    const limitedValidFiles = validFiles.slice(0, CONSTRAINTS.MAX_FILE_COUNT);
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
    previewData.forEach((data) => URL.revokeObjectURL(data.path));
    setFiles([]);
    setPreviewData([]);
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
    previewData,
    isUploading,
    errorMessage,
    handleUpload,
    handleFilesUploadClick,
    handleFilesDrop,
  };
};

export default useFileUpload;
