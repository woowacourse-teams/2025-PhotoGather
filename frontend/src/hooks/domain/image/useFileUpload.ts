import { photoService } from '../../../apis/services/photo/photo.service';
import type {
  ImageCategoryType,
  LocalFile,
  UploadFile,
} from '../../../types/file.type';

interface UseFileUploadProps {
  spaceCode: string;
  localFiles: LocalFile[];
  onUploadSuccess: () => void;
  clearFiles: () => void;
}

const useFileUpload = ({
  spaceCode,
  localFiles,
  clearFiles,
}: UseFileUploadProps) => {
  const processFileUpload = async (category: ImageCategoryType) => {
    try {
      const uploadFiles = createUploadFiles();

      const presignedUrls = await fetchPresignedUrls(uploadFiles, category);
      const uploadFilesWithPresignedUrls = addPresignedUrls(
        uploadFiles,
        presignedUrls ?? {},
      );

      const uploadedFiles = await uploadFilesToS3(uploadFilesWithPresignedUrls);
      return uploadedFiles;
    } catch (error) {
      console.error('파일 업로드 실패', error);
      clearFiles();
      throw error;
    }
  };

  const createUploadFiles = () => {
    return localFiles.map((file) => {
      const extension = file.originFile.name.split('.').pop();
      const objectKey = `${crypto.randomUUID()}.${extension}`;

      return {
        id: file.id,
        originFile: file.originFile,
        objectKey,
        capturedAt: file.capturedAt,
        capacityValue: file.capacityValue,
        presignedUrl: '',
        state: 'idle' as const,
      };
    });
  };

  const fetchPresignedUrls = async (
    uploadFiles: UploadFile[],
    category: ImageCategoryType,
  ) => {
    const uuidFileNames = uploadFiles.map((f) => f.objectKey);

    try {
      const response = await photoService.getPresignedUrls(
        spaceCode,
        category,
        uuidFileNames,
      );
      if (!response.success || !response.data?.signedUrls) {
        throw new Error('서버에서 presignedUrl 발급에 실패했습니다.');
      }

      return response.data.signedUrls;
    } catch (error) {
      console.error('presignedUrl 발급 실패', error);
      throw error;
    }
  };

  const addPresignedUrls = (
    uploadFiles: UploadFile[],
    presignedUrls: Record<string, string>,
  ) => {
    return uploadFiles.map((file) => ({
      ...file,
      presignedUrl: presignedUrls[file.objectKey] ?? '',
      state: 'signed' as const,
    }));
  };

  const uploadSingleFileToS3 = async (presignedUrl: string, file: File) => {
    const response = await photoService.uploadPhotoToS3(presignedUrl, file);
    if (!response.ok) {
      throw new Error(`s3 업로드 도중 실패: ${file.name}`);
    }
    return response;
  };

  const uploadFilesToS3 = async (uploadFiles: UploadFile[]) => {
    try {
      const uploadPromises = uploadFiles.map((file) =>
        uploadSingleFileToS3(file.presignedUrl, file.originFile),
      );

      const results = await Promise.allSettled(uploadPromises);
      const rejectedFiles = results.filter(
        (result) => result.status === 'rejected',
      );
      if (rejectedFiles.length > 0) {
        throw new Error(
          `s3 업로드 도중 실패: ${rejectedFiles.map((result) => result.reason).join(', ')}`,
        );
      }

      const successfullyUploadedFiles: UploadFile[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successfullyUploadedFiles.push({
            ...uploadFiles[index],
            state: 'uploaded' as const,
          });
        }
      });

      return successfullyUploadedFiles;
    } catch (error) {
      console.error(`s3 업로드 도중 실패`, error);
    }
  };

  return {
    processFileUpload,
  };
};
export default useFileUpload;
