import { downloadZip } from 'client-zip';
import { useState } from 'react';
import type { DownloadInfo } from '../../../types/photo.type';

const useDownloadAsZip = () => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadAsZip = async (
    downloadInfos: DownloadInfo[],
    zipName?: string,
  ) => {
    const CHUNK_SIZE = 5;
    const files: {
      name: string;
      input: Blob;
      lastModified: Date;
    }[] = [];

    setIsLoading(true);

    for (let i = 0; i < downloadInfos.length; i += CHUNK_SIZE) {
      const batch = downloadInfos.slice(i, i + CHUNK_SIZE);

      const results = await Promise.allSettled(
        batch.map(async (downloadInfo) => {
          const response = await fetch(downloadInfo.path);
          if (!response.ok) {
            throw new Error(`다운로드 실패: ${downloadInfo.originalName}`);
          }
          const blob = await response.blob();

          return {
            name: downloadInfo.originalName,
            input: blob,
            lastModified: new Date(),
          };
        }),
      );

      if (results.some((r) => r.status === 'rejected')) {
        setIsLoading(false);
        throw new Error('다운로드가 실패했습니다. 다시 시도해 주세요.');
      }

      results.forEach((result) => {
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
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = `${zipName ?? 'photos'}.zip`;
    link.click();
    URL.revokeObjectURL(link.href);

    setIsLoading(false);
  };

  return { downloadAsZip, isLoading };
};

export default useDownloadAsZip;
