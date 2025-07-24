import { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
import { mockSpaceData } from '../pages/manager/spaceHome/mockSpaceData';
import { tryAsync } from '../utils/tryAsync';

interface UseDownloadProps {
  spaceName: string;
}

const useDownload = ({ spaceName }: UseDownloadProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownload = () => {
    setIsDownloading(true);
    tryAsync(
      async () => {
        const response = await photoService.downloadZip(mockSpaceData.code);
        const blob = response.data;
        if (!blob) {
          throw new Error(DEBUG_MESSAGES.NO_BLOB);
        }
        if (!(blob instanceof Blob)) {
          throw new Error(DEBUG_MESSAGES.NO_BLOB_INSTANCE);
        }
        downloadBlob(blob);
      },
      () => {
        setIsDownloading(false);
      },
    );
  };
  return { isDownloading, handleDownload };
};

export default useDownload;
