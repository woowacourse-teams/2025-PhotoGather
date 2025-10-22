import * as Sentry from '@sentry/react';
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
    const presignedError = new Error('Presigned URL 발급 실패');

    Sentry.captureException(presignedError, {
      tags: {
        error_type: 's3_presigned_url_failed',
      },
      extra: {
        spaceCode,
        category,
        fileCount: files.length,
        uploadFileNames,
        responseSuccess: presignedResponse.success,
      },
    });

    throw presignedError;
  }

  const signedUrls = presignedResponse.data.signedUrls;

  // 3. S3에 업로드
  try {
    await Promise.all(
      uploadFileData.map(async ({ file, uploadFileName }) => {
        const presignedUrl = signedUrls[uploadFileName];
        if (!presignedUrl) {
          throw new Error(`Presigned URL not found for ${uploadFileName}`);
        }
        await photoService.uploadPhotoToS3(presignedUrl, file);
      }),
    );
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        error_type: 's3_upload_failed',
      },
      extra: {
        spaceCode,
        category,
        fileCount: files.length,
        totalSize: files.reduce((sum, f) => sum + f.size, 0),
        fileNames: files.map((f) => f.name),
      },
    });

    throw error;
  }

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
