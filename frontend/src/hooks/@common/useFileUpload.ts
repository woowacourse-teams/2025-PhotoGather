import { useState } from 'react';

const useFileUpload = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const addPreviewUrlsFromFiles = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const isImageFile = (file: File) => file.type.startsWith('image/');

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
    setImageFiles((prev) => [...prev, ...validFiles]);
    addPreviewUrlsFromFiles(validFiles);
  };

  const handleFilesDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    const files = Array.from(event.dataTransfer.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    addPreviewUrlsFromFiles(files);
  };

  const clearFiles = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setImageFiles([]);
    setPreviewUrls([]);
  };

  return {
    imageFiles,
    previewUrls,
    handleFilesUpload,
    handleFilesDrop,
    clearFiles,
  };
};

export default useFileUpload;
