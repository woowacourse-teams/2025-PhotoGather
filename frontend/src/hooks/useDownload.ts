import { downloadZip } from 'client-zip';
import { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import type { AllDownloadInfos } from '../types/photo.type';
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

  const downloadAsImage = (url: string, fileName?: string) => {
    const link = document.createElement('a');

    link.href = url;
    // TODO : 확장자 찾는 로직
    link.download = `${fileName}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAsZip = async (allDownloadInfos: AllDownloadInfos[]) => {
    const files = await Promise.all(
      allDownloadInfos.map(async (allDownloadInfo, index) => {
        const response = await fetch(allDownloadInfo.url);
        const blob = await response.blob();
        const filename = `image_${index + 1}.${blob.type.split('/')[1]}`;

        return { name: filename, blob };
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

        downloadAsZip(data);
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
        const data = response.data;

        downloadAsImage(data.url, data.originalName);
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

        downloadAsZip(data.downloadUrls);
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
