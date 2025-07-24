import { useState } from 'react';
import { photoService } from '../../apis/services/photo.service';

const useFileUpload = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const addPreviewUrlsFromFiles = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const handleFilesUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    //TODO: 파일 업로드 최대 용량 제한 | 업로드 최대 개수 제한?
    const files = Array.from(event.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    addPreviewUrlsFromFiles(files);
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

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      await photoService.uploadFiles('1234567890', imageFiles);
      clearFiles();
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('사진 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    imageFiles,
    previewUrls,
    isUploading,
    handleUpload,
    handleFilesUploadClick,
    handleFilesDrop,
  };
};

export default useFileUpload;
