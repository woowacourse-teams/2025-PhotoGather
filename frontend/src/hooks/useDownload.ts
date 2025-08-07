import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { photoService } from '../apis/services/photo.service';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
import { NETWORK } from '../constants/errors';
import { ROUTES } from '../constants/routes';
import { mockSpaceData } from '../pages/manager/spaceHome/mockSpaceData';
import type { ApiResponse } from '../types/api.type';
import useApiCall from './@common/useApiCall';

interface UseDownloadProps {
  spaceName: string;
}

const useDownload = ({ spaceName }: UseDownloadProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const { safeApiCall } = useApiCall();

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
    await handleDownload(() =>
      photoService.downloadPhotos(mockSpaceData.code, {
        photoIds: photoIds,
      }),
    );
  };

  const downloadAll = async () => {
    await handleDownload(() => photoService.downloadAll(mockSpaceData.code));
  };

  const handleDownload = async (
    fetchFunction: () => Promise<ApiResponse<unknown>>,
  ) => {
    try {
      setIsDownloading(true);
      const response = await safeApiCall(fetchFunction);

      if (response.success && response.data) {
        const blob = response.data;
        if (!(blob instanceof Blob)) {
          throw new Error(DEBUG_MESSAGES.NO_BLOB_INSTANCE);
        }
        downloadBlob(blob);
        navigate(ROUTES.COMPLETE.DOWNLOAD);
      } else {
        if (
          !response.error?.toLowerCase().includes(NETWORK.DEFAULT.toLowerCase())
        ) {
          console.error('다운로드에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('다운로드 실패:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  return { isDownloading, downloadAll, selectDownload };
};

export default useDownload;
