import type { PresignedUrlResponse } from '../../../types/photo.type';
import { http } from '../../http';

export const photoService = {
  getPresignedUrls: (
    spaceCode: string,
    category: string,
    uploadFileNames: string[],
  ) =>
    http.post<PresignedUrlResponse>(`/spaces/${spaceCode}/upload/signed-urls`, {
      category,
      uploadFileNames,
    }),

  uploadPhotoToS3: async (presignedUrl: string, file: File) => {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        'Cache-Control': 'no-store',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`,
        'x-amz-tagging':
          'Service=techcourse&Role=techcourse-etc&ProjectTeam=PhotoGather',
      },
    });

    if (!response.ok) {
      throw new Error(`S3 upload failed: ${response.status}`);
    }

    return response;
  },
};
