import { downloadZip } from 'client-zip';
import { useEffect, useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import type { DownloadInfo } from '../types/photo.type';
import { buildOriginalImageUrl } from '../utils/buildImageUrl';
import { parseImagePath } from '../utils/parsedImagePath';
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

  const saveZipByFilePicker = async (body: ReadableStream<Uint8Array>) => {
    try {
      // biome-ignore lint/suspicious/noExplicitAny: any 사용 필요
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: `${spaceName}.zip`,
        types: [
          { description: 'Zip file', accept: { 'application/zip': ['.zip'] } },
        ],
      });
      const writable = await handle.createWritable();
      await body.pipeTo(writable);
    } catch (error) {
      if (!(error instanceof Error)) return;
      if (error.name === 'AbortError') {
        showToast({
          text: '다운로드가 취소되었습니다.',
          type: 'info',
        });
      }
      throw error;
    }
  };

  const saveZipByDownloadLink = async (response: Response) => {
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = `${spaceName}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const fetchSingleImage = async (url: string, originalName: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`s3에서 이미지 fetch 실패: ${originalName}`);
    }
    const blob = await response.blob();
    return blob;
  };

  const downloadAsBlobFile = async (downloadInfos: DownloadInfo[]) => {
    const CHUNK_SIZE = 10;
    const files: {
      name: string;
      input: Blob;
      lastModified: Date;
    }[] = [];

    for (let i = 0; i < downloadInfos.length; i += CHUNK_SIZE) {
      const batch = downloadInfos.slice(i, i + CHUNK_SIZE);

      const results = await Promise.allSettled(
        batch.map(async (downloadInfo) => {
          const blob = await fetchSingleImage(
            downloadInfo.url,
            downloadInfo.originalName,
          );
          setCurrentProgress((prev) => prev + 1);

          return {
            name: downloadInfo.originalName,
            input: blob,
            lastModified: new Date(),
          };
        }),
      );

      if (results.some((r) => r.status === 'rejected')) {
        throw new Error('다운로드가 실패했습니다. 다시 시도해 주세요.');
      }
      results.map((result) => {
        if (result.status === 'fulfilled') {
          files.push({
            name: result.value.name,
            input: result.value.input,
            lastModified: result.value.lastModified,
          });
        }
      });
    }
    const zipBlob = await downloadZip(files).blob();
    await saveZipByDownloadLink(new Response(zipBlob));
  };

  const downloadAsStreaming = async (downloadInfos: DownloadInfo[]) => {
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
      await saveZipByFilePicker(response.body);
      return;
    }
    await saveZipByDownloadLink(response);
  };

  const downloadMultipleImages = async (downloadInfos: DownloadInfo[]) => {
    if ('serviceWorker' in navigator) {
      await downloadAsStreaming(downloadInfos);
      return;
    }
    await downloadAsBlobFile(downloadInfos);
  };

  const downloadImage = async (url: string, fileName: string) => {
    const blob = await fetchSingleImage(url, fileName);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(URL.createObjectURL(blob));
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
        const parsedDownloadUrls = downloadUrls.map((info) => {
          return {
            ...info,
            url: buildOriginalImageUrl(parseImagePath(info.url)),
          };
        });

        if (downloadUrls.length === 1) {
          await downloadImage(
            parsedDownloadUrls[0].url,
            parsedDownloadUrls[0].originalName,
          );
          return;
        }

        setTotalProgress(parsedDownloadUrls.length);
        await downloadMultipleImages(parsedDownloadUrls);
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
        const parsedDownloadUrls = downloadUrls.map((info) => {
          return {
            ...info,
            url: buildOriginalImageUrl(parseImagePath(info.url)),
          };
        });

        await downloadImage(
          parsedDownloadUrls[0].url,
          parsedDownloadUrls[0].originalName,
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

        const parsedDownloadUrls = downloadUrls.map((info) => {
          return {
            ...info,
            url: buildOriginalImageUrl(parseImagePath(info.url)),
          };
        });
        await downloadMultipleImages(parsedDownloadUrls);

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
