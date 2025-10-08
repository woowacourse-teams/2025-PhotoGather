import { shareByWebShareAPI } from '../../utils/webShareApi';
import { validateCanWebShare } from '../../validators/share.validators';

const useImageDownload = () => {
  const downloadByAnchor = async (blob: Blob, fileName: string) => {
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = objectUrl;
    const safeFileName = fileName.replace(/[/\\:*?"<>|]/g, '_');
    link.download = `${safeFileName}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
    }, 0);
  };

  const saveImage = async (blob: Blob, fileName: string) => {
    try {
      validateCanWebShare();

      const file = new File([blob], fileName, { type: blob.type });
      await shareByWebShareAPI({
        files: [file],
        title: '스페이스 QR',
      });
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        downloadByAnchor(blob, fileName);
      }
    }
  };

  return { saveImage };
};

export default useImageDownload;
