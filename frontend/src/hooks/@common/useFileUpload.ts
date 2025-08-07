import { useState } from 'react';
import { photoService } from '../../apis/services/photo.service';
import { CONSTRAINTS } from '../../constants/constraints';
import { NETWORK } from '../../constants/errors';
import type { PreviewFile, UploadFile } from '../../types/file.type';
import type { ToastBase } from '../../types/toast.type';
import { isValidFileType } from '../../utils/isValidFileType';
import useApiCall from './useApiCall';

interface UseFileUploadProps {
  fileType: string;
  //TODO: 추후 다른 에러 ui가 들어온다면, 타입 변경 필수
  showError: (options: ToastBase) => void;
}

const useFileUpload = ({ fileType, showError }: UseFileUploadProps) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [previewData, setPreviewData] = useState<PreviewFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { safeApiCall } = useApiCall();

  const addPreviewUrlsFromFiles = (files: File[]) => {
    const startIndex = previewData.length;
    const urls = files.map((file, index) => ({
      id: startIndex + index,
      path: URL.createObjectURL(file),
    }));

    const tmpFiles = files.map((file, index) => ({
      id: startIndex + index,
      originFile: file,
    }));

    setPreviewData((prev) => [...prev, ...urls]);
    setUploadFiles((prev) => [...prev, ...tmpFiles]);
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
    // setFiles((prev) => [...prev, ...limitedValidFiles]);
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
    setUploadFiles([]);
    setPreviewData([]);
  };

  const handleUploadFiles = async () => {
    try {
      setIsUploading(true);
      const files = uploadFiles.map((file) => file.originFile);
      const response = await safeApiCall(() =>
        photoService.uploadFiles('1234567890', files),
      );

      if (response.success) {
        clearFiles();
        return true;
      } else {
        // JSON 파싱 에러는 업로드 성공으로 간주 (서버가 빈 응답 반환)
        // TODO: 이 부분 다듬기 필요 react-query 도입 후 사라질 로직
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
          showError({ text: '사진 업로드에 실패했습니다' });
        }
        return false;
      }
    } catch (error) {
      console.error('사진 업로드 실패:', error);
      showError({ text: '사진 업로드에 실패했습니다' });
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = (id: number) => {
    setPreviewData((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      const deleted = prev.find((item) => item.id === id);
      if (deleted) URL.revokeObjectURL(deleted.path);
      return updated;
    });

    setUploadFiles((prev) => {
      return prev.filter((file) => file.id !== id);
    });
  };

  return {
    uploadFiles,
    previewData,
    isUploading,
    handleUploadFiles,
    handleDeleteFile,
    handleFilesUploadClick,
    handleFilesDrop,
  };
};

export default useFileUpload;
