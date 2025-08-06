import { useState } from 'react';
import { photoService } from '../../apis/services/photo.service';
import { CONSTRAINTS } from '../../constants/constraints';
import { NETWORK } from '../../constants/errors';
import type { PreviewFile } from '../../types/file.type';
import type { ToastBase } from '../../types/toast.type';
import { isValidFileType } from '../../utils/isValidFileType';
import useApiCall from './useApiCall';

interface UseFileUploadProps {
  fileType: string;
  //TODO: 추후 다른 에러 ui가 들어온다면, 타입 변경 필수
  showError: (options: ToastBase) => void;
}

const useFileUpload = ({ fileType, showError }: UseFileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewData, setPreviewData] = useState<PreviewFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { safeApiCall } = useApiCall();

  const addPreviewUrlsFromFiles = (files: File[]) => {
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
      showError({
        text: `한 번에 ${CONSTRAINTS.MAX_FILE_COUNT}장까지 올릴 수 있어요`,
      });
    }
    if (hasInvalidFiles) {
      showError({
        text: `이미지 파일만 업로드 가능해요. 파일을 다시 확인해주세요.`,
      });
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
          console.error('사진 업로드에 실패했습니다.');
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
    previewData,
    isUploading,
    handleUpload,
    handleFilesUploadClick,
    handleFilesDrop,
  };
};

export default useFileUpload;
