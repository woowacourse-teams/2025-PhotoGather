import { useState } from 'react';

export const useFile = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const addPreviewUrlsFromFiles = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //TODO: 파일 업로드 최대 용량 제한 | 업로드 최대 개수 제한?
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    addPreviewUrlsFromFiles(files);
  };

  const handleFilesDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    const files = Array.from(e.dataTransfer.files || []);
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
