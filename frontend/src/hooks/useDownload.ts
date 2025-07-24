import { useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import { DEBUG_MESSAGES } from '../constants/debugMessages';
import { mockSpaceData } from '../pages/manager/spaceHome/mockSpaceData';
import { tryAsync } from '../utils/tryAsync';

const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    tryAsync(
      async () => {
        setIsDownloading(true);
        const response = await photoService.downloadZip(mockSpaceData.code);
        const blob = response.data;
        if (!blob) {
          throw new Error(DEBUG_MESSAGES.NO_BLOB);
        }
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'sample.zip';
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      () => {
        setIsDownloading(false);
      },
    );
  };
  return { isDownloading, handleDownload };
};

export default useDownload;
