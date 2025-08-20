import { downloadZip } from 'client-zip';
import { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import type { DownloadInfo } from '../types/photo.type';
import { checkSelectedPhotoExist } from '../validators/photo.validator';
import useError from './@common/useError';

// TODO : validate 함수 삭제
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
  const { tryTask, tryFetch } = useError();

  const downloadAsImage = async (url: string, fileName: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = `${fileName}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(objectUrl);
  };

  const downloadAsZip = async (downloadInfos: DownloadInfo[]) => {
    const files = await Promise.all(
      downloadInfos.map(async (downloadInfo) => {
        const response = await fetch(downloadInfo.url);
        const blob = await response.blob();

        return {
          name: downloadInfo.originalName,
          input: blob,
          lastModified: new Date(),
        };
      }),
    );

    const zipBlob = await downloadZip(files).blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = `${spaceName}.zip`;
    link.click();

    URL.revokeObjectURL(link.href);
  };

  const trySelectedDownload = async (photoIds: number[]) => {
    const taskResult = tryTask({
      task: () => checkSelectedPhotoExist(photoIds),
      errorActions: ['toast'],
    });
    if (!taskResult.success) return;

    await tryFetch({
      task: async () => {
        const response = await photoService.downloadPhotos(spaceCode, {
          photoIds: photoIds,
        });
        if (!response.data) return;
        const data = response.data;
        const { downloadUrls } = data;
        downloadAsZip(downloadUrls);
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

  const trySingleDownload = async (photoId: number) => {
    await tryFetch({
      task: async () => {
        const response = await photoService.downloadSinglePhoto(
          spaceCode,
          photoId,
        );
        if (!response.data) return;
        const { downloadUrls } = response.data;

        downloadAsImage(downloadUrls[0].url, downloadUrls[0].originalName);
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

  const tryAllDownload = async () => {
    await tryFetch({
      task: async () => {
        setIsDownloading(true);
        const response = await photoService.downloadAll(spaceCode);

        if (!response.data) return;
        const data = response.data;
        const { downloadUrls } = data;

        downloadAsZip(downloadUrls);
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
    });
  };

  return {
    isDownloading,
    tryAllDownload,
    trySingleDownload,
    trySelectedDownload,
  };
};

export default useDownload;
