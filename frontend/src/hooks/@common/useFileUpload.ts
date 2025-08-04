import { useState } from 'react';
import { photoService } from '../../apis/services/photo.service';
import { NETWORK } from '../../constants/errors';
import { isValidFileType } from '../../utils/isValidFileType';
import useApiCall from './useApiCall';

interface FileUploadProps {
  fileType: string;
}

const useFileUpload = ({ fileType }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { safeApiCall } = useApiCall();

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

  const handleFilesUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const response = await safeApiCall(() =>
        photoService.uploadFiles('1234567890', files),
      );

      if (response.success) {
        clearFiles();
        return true;
      } else {
        // JSON 파싱 에러는 업로드 성공으로 간주 (서버가 빈 응답 반환)
        // TODO: 이 부분 다듬기 필요
        if (
          response.error ===
          "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
        ) {
          clearFiles();
          return true;
        } else if (
          !response.error?.toLowerCase().includes(NETWORK.DEFAULT.toLowerCase())
        ) {
          alert('사진 업로드에 실패했습니다.');
        }
        return false;
      }
    } catch (error) {
      console.error('사진 업로드 실패:', error);
      return false;
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
