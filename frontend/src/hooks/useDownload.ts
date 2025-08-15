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

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${spaceName}.zip`;
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
      sentryLog: {
        body: {
          photoIds,
        },
      },
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
      sentryLog: {
        body: {
          spaceCode,
        },
      },
    });
  };

  const handleDownload = async (
    fetchFunction: () => Promise<ApiResponse<unknown>>,
  ) => {
    const response = await fetchFunction();
    if (!response) return;
    const blob = response.data;

    await tryTask({
      task: () => {
        validateDownloadFormat(blob);
        downloadBlob(blob as Blob);
      },
      errorActions: ['console'],
      sentryLog: {
        body: {
          spaceCode,
        },
      },
    });
  };
  return { isDownloading, downloadAll, selectDownload };
};

export default useDownload;
