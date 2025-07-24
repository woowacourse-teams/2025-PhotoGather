import { useState } from 'react';
import { isValidFileType } from '../../utils/isValidFileType';

interface FileUploadProps {
  fileType: string;
}

const useFileUpload = ({ fileType }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
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

  const handleFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TODO: 파일 업로드 최대 용량 제한 | 업로드 최대 개수 제한?
    const files = Array.from(event.target.files || []);
    const { validFiles, invalidFiles } = partitionValidFilesByType(
      files,
      fileType,
    );
    if (invalidFiles.length > 0)
      setErrorMessage(
        `이미지 파일만 업로드 가능해요. 파일을 다시 확인해주세요.\n${invalidFiles.map((file) => file.name).join('\n')}`,
      );
    setFiles((prev) => [...prev, ...validFiles]);
    addPreviewUrlsFromFiles(validFiles);
  };

  const handleFilesDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    const files = Array.from(event.dataTransfer.files || []);
    const { validFiles, invalidFiles } = partitionValidFilesByType(
      files,
      fileType,
    );
    if (invalidFiles.length > 0)
      setErrorMessage(
        `이미지 파일만 업로드 가능해요. 파일을 다시 확인해주세요.\n${invalidFiles.map((file) => file.name).join('\n')}`,
      );

    setFiles((prev) => [...prev, ...validFiles]);
    addPreviewUrlsFromFiles(validFiles);
  };

  const clearFiles = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviewUrls([]);
  };

  return {
    files,
    previewUrls,
    errorMessage,
    handleFilesUpload,
    handleFilesDrop,
    clearFiles,
  };
};

export default useFileUpload;
