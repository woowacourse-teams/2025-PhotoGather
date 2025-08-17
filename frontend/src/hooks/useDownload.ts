import { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import type { ApiResponse } from '../types/api.type';
import { validateDownloadFormat } from '../validators/fetch.validator';
import { checkSelectedPhotoExist } from '../validators/photo.validator';
import useError from './@common/useError';

interface UseDownloadProps {
  spaceCode: string;
  spaceName: string;
  onDownloadSuccess?: () => void;
}

const useDownload = ({
  spaceCode,
  spaceName,
  onDownloadSuccess,
}: UseDownloadProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { tryTask } = useError();

  const getDownloadName = (
    fileName: string | undefined,
    blob: Blob,
    spaceName: string,
  ) => {
    if (fileName) return fileName;

    if (blob.type.includes('image/')) {
      const extension = blob.type.split('/')[1];
      return `photo.${extension}`;
    }

    return `${spaceName}.zip`;
  };

  const downloadBlob = (blob: Blob, fileName?: string) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;

    a.download = getDownloadName(fileName, blob, spaceName);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const selectDownload = async (photoIds: number[]) => {
    const taskResult = await tryTask({
      task: () => checkSelectedPhotoExist(photoIds),
      errorActions: ['toast'],
    });
    if (!taskResult.success) return;

    await tryTask({
      task: async () => {
        await handleDownload(() =>
          photoService.downloadPhotos(spaceCode, {
            photoIds: photoIds,
          }),
        );
      },
      errorActions: ['toast', 'console'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
      shouldLogToSentry: true,
    });
  };

  const downloadSingle = async (photoId: number) => {
    await tryTask({
      task: async () => {
        await handleDownload(() =>
          photoService.downloadSinglePhoto(spaceCode, photoId),
        );
      },
      errorActions: ['toast', 'console'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
      shouldLogToSentry: true,
    });
  };

  const downloadAll = async () => {
    await tryTask({
      task: async () => {
        setIsDownloading(true);
        await handleDownload(() => photoService.downloadAll(spaceCode));
        onDownloadSuccess?.();
      },
      errorActions: ['toast', 'console'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
      onFinally: () => {
        setIsDownloading(false);
      },
      shouldLogToSentry: true,
    });
  };

  const handleDownload = async (
    fetchFunction: () => Promise<ApiResponse<unknown>>,
    fileName?: string,
  ) => {
    const response = await fetchFunction();
    if (!response) return;
    const blob = response.data;

    await tryTask({
      task: () => {
        validateDownloadFormat(blob);
        downloadBlob(blob as Blob, fileName);
      },
      errorActions: ['console'],
      shouldLogToSentry: true,
    });
  };

  return { isDownloading, downloadAll, selectDownload, downloadSingle };
};

export default useDownload;
