import { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import type { DownloadInfo } from '../types/photo.type';
import { checkSelectedPhotoExist } from '../validators/photo.validator';
import useTaskHandler from './@common/useTaskHandler';

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
  const [totalProgress, setTotalProgress] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  const { loadingState, tryTask, tryFetch } = useTaskHandler();

  const downloadAsImage = async (url: string, fileName: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = objectUrl;
    const safeFileName = fileName.replace(/[/\\:*?"<>|]/g, '_');
    link.download = `${safeFileName}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(objectUrl);
  };

  const downloadAsZip = async (downloadInfos: DownloadInfo[]) => {
    try {
      const response = await fetch('/streaming-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          downloadInfos: downloadInfos,
          zipName: `${spaceName}.zip`,
        }),
      });

      if (!response.ok) {
        throw new Error('다운로드 요청 실패');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${spaceName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('다운로드 오류:', error);
      if (error instanceof Error) {
        alert(`다운로드 중 오류가 발생했습니다: ${error.message}`);
      }
    }
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

        if (downloadUrls.length === 1) {
          await downloadAsImage(
            downloadUrls[0].url,
            downloadUrls[0].originalName,
          );
          return;
        }

        setTotalProgress(downloadUrls.length);
        await downloadAsZip(downloadUrls);
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
      loadingStateKey: 'selectedDownload',
      onFinally: () => {
        setTotalProgress(0);
        setCurrentProgress(0);
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

        await downloadAsImage(
          downloadUrls[0].url,
          downloadUrls[0].originalName,
        );
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
      loadingStateKey: 'singleDownload',
    });
  };

  const tryAllDownload = async () => {
    const start = performance.now();

    await tryFetch({
      task: async () => {
        const response = await photoService.downloadAll(spaceCode);

        if (!response.data) return;
        const data = response.data;
        const { downloadUrls } = data;

        setTotalProgress(downloadUrls.length);

        const prefix = 'photogather/';
        const parsedDownloadUrls = downloadUrls.map((info) => ({
          url: process.env.IMAGE_BASE_URL + info.url.slice(prefix.length),
          originalName: info.originalName,
        }));
        console.log(parsedDownloadUrls);
        await downloadAsZip(parsedDownloadUrls);

        onDownloadSuccess?.();
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
      loadingStateKey: 'allDownload',
      onFinally: () => {
        const end = performance.now(); // 최종 완료 시점
        console.log('시작 시각', start);
        console.log('최종 완료 시각', end);
        console.log(`총 소요 시간: ${(end - start) / 1000}초`);

        setTotalProgress(0);
        setCurrentProgress(0);
      },
    });
  };

  return {
    isDownloading:
      loadingState.allDownload === 'loading' ||
      loadingState.singleDownload === 'loading' ||
      loadingState.selectedDownload === 'loading',
    tryAllDownload,
    trySingleDownload,
    trySelectedDownload,
    totalProgress,
    currentProgress,
  };
};

export default useDownload;
