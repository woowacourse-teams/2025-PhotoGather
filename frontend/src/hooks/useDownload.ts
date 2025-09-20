import { useEffect, useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import type { DownloadInfo } from '../types/photo.type';
import { checkSelectedPhotoExist } from '../validators/photo.validator';
import useTaskHandler from './@common/useTaskHandler';
import { useToast } from './@common/useToast';

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
  const { showToast } = useToast();

  const { loadingState, tryTask, tryFetch } = useTaskHandler();

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      if (event.data.type === 'DOWNLOAD_PROGRESS') {
        setCurrentProgress(event.data.completed);
      }
    };
    navigator.serviceWorker.addEventListener('message', receiveMessage);
    return () => {
      navigator.serviceWorker.removeEventListener('message', receiveMessage);
    };
  }, []);

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

  const downloadByFilePicker = async (body: ReadableStream<Uint8Array>) => {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: `${spaceName}.zip`,
        types: [
          { description: 'Zip file', accept: { 'application/zip': ['.zip'] } },
        ],
      });
      const writable = await handle.createWritable();
      await body.pipeTo(writable);
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      if (error.name === 'AbortError') {
        showToast({
          text: '다운로드가 취소되었습니다.',
          type: 'info',
        });
      }
      throw error;
    }
  };

  const downloadByDownloadLink = async (response: Response) => {
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = `${spaceName}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsZip = async (downloadInfos: DownloadInfo[]) => {
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

    if (!response.ok || !response.body) {
      throw new Error('service worker 다운로드 요청 실패');
    }

    if ('showSaveFilePicker' in window) {
      await downloadByFilePicker(response.body);
      return;
    }
    await downloadByDownloadLink(response);
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
        await downloadAsZip(parsedDownloadUrls);

        onDownloadSuccess?.();
      },
      errorActions: ['toast', 'console'],
      context: {
        toast: {
          text: '다운로드에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      },
      loadingStateKey: 'allDownload',
      onFinally: () => {
        const end = performance.now();
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
