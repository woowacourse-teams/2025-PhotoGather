import { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import type { ApiResponse } from '../types/api.type';
import { validateDownloadFormat } from '../validators/fetch.validator';
import { checkSelectedPhotoExist } from '../validators/photo.validator';
import useError from './@common/useError';
import useWebShareAPI from './useWebShareAPI';

interface UseDownloadProps {
  spaceCode: string;
  spaceName: string;
  onDownloadSuccess?: () => void;
}

type DownloadMode = 'download' | 'share';

const useDownload = ({
  spaceCode,
  spaceName,
  onDownloadSuccess,
}: UseDownloadProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { tryTask, tryFetch } = useError();
  const { share } = useWebShareAPI();

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

  const downloadSelected = async (
    photoIds: number[],
    fileName?: string,
    mode?: DownloadMode,
  ) => {
    const taskResult = tryTask({
      task: () => checkSelectedPhotoExist(photoIds),
      errorActions: ['toast'],
    });
    if (!taskResult.success) return;

    await tryFetch({
      task: async () => {
        await handleDownload(
          () =>
            photoService.downloadPhotos(spaceCode, {
              photoIds: photoIds,
            }),
          fileName,
          mode,
        );
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
    });
  };

  const downloadSingle = async (
    photoId: number,
    fileName?: string,
    mode?: DownloadMode,
  ) => {
    await tryFetch({
      task: async () => {
        await handleDownload(
          () => photoService.downloadSinglePhoto(spaceCode, photoId),
          fileName,
          mode,
        );
      },
      errorActions: ['toast', 'console'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
    });
  };

  const downloadAll = async (fileName?: string, mode?: DownloadMode) => {
    await tryFetch({
      task: async () => {
        await handleDownload(
          () => photoService.downloadAll(spaceCode),
          fileName,
          mode,
        );
        onDownloadSuccess?.();
      },
      errorActions: ['toast', 'console'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
    });
  };

  const handleDownload = async (
    fetchFunction: () => Promise<ApiResponse<Blob>>,
    fileName?: string,
    mode: DownloadMode = 'download',
  ) => {
    const response = await fetchFunction();
    if (!response || !response.data) return;
    const blob = response.data;

    tryTask({
      task: async () => {
        setIsDownloading(true);
        validateDownloadFormat(blob);
        if (mode === 'share') {
          const file = new File(
            [blob],
            getDownloadName(undefined, blob, spaceName),
            { type: blob.type },
          );
          await share({ files: [file] });
        }
        if (mode === 'download') downloadBlob(blob, fileName);
      },
      errorActions: ['console'],
      onFinally: () => {
        setIsDownloading(false);
      },
    });
  };

  return {
    isDownloading,
    downloadAll,
    downloadSelected,
    downloadSingle,
  };
};

export default useDownload;
