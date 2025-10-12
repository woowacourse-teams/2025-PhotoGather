import { photoService } from '../apis/services/photo/photo.service';
import type { PhotoUpload } from '../types/domain/work.type';

export const uploadPhotosToS3 = async (
  spaceCode: string,
  category: string,
  files: File[],
): Promise<PhotoUpload[]> => {
  if (files.length === 0) return [];

  // 1. UUID 파일명 생성
  const uploadFileData = files.map((file) => {
    const extension = getFileExtension(file.name);
    const uploadFileName = `${crypto.randomUUID()}${extension}`;
    return { file, uploadFileName };
  });

  // 2. Presigned URLs 발급
  const uploadFileNames = uploadFileData.map((d) => d.uploadFileName);
  const presignedResponse = await photoService.getPresignedUrls(
    spaceCode,
    category,
    uploadFileNames,
  );

  if (!presignedResponse.success || !presignedResponse.data?.signedUrls) {
    throw new Error('Presigned URL 발급 실패');
  }

  const signedUrls = presignedResponse.data.signedUrls;

  // 3. S3에 업로드
  await Promise.all(
    uploadFileData.map(async ({ file, uploadFileName }) => {
      const presignedUrl = signedUrls[uploadFileName];
      if (!presignedUrl) {
        throw new Error(`Presigned URL not found for ${uploadFileName}`);
      }
      await photoService.uploadPhotoToS3(presignedUrl, file);
    }),
  );

  // 4. 서버에게 notify
  return uploadFileData.map(({ file, uploadFileName }) => ({
    originalName: file.name,
    uploadFileName: `${uploadFileName}`,
    capacity: file.size,
  }));
};

const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.substring(lastDot) : '';
};
