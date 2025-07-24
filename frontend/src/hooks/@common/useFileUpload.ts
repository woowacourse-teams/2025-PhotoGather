import { useState } from 'react';

interface FileUploadProps {
  fileType: string;
}

const useFileUpload = ({ fileType }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const addPreviewUrlsFromFiles = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const isImageFile = (file: File) => file.type.startsWith(`${fileType}/`);

  const handleFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TODO: 파일 업로드 최대 용량 제한 | 업로드 최대 개수 제한?
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(isImageFile);
    const invalidFiles = files.filter((file) => !isImageFile(file));
    if (invalidFiles.length > 0) {
      alert(
        `이미지 파일만 업로드 가능해요. 파일을 다시 확인해주세요.\n${invalidFiles.map((file) => file.name).join('\n')}`,
      );
    }
    setFiles((prev) => [...prev, ...validFiles]);
    addPreviewUrlsFromFiles(validFiles);
  };

  const handleFilesDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    const files = Array.from(event.dataTransfer.files || []);
    setFiles((prev) => [...prev, ...files]);
    addPreviewUrlsFromFiles(files);
  };

  const clearFiles = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviewUrls([]);
  };

  return {
    files,
    previewUrls,
    handleFilesUpload,
    handleFilesDrop,
    clearFiles,
  };
};

export default useFileUpload;
