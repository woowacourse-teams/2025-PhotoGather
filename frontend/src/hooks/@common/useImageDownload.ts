import { validateCanWebShare } from '../../validators/share.validators';
import useWebShareAPI from './useWebShareAPI';

const useImageDownload = () => {
  const { share } = useWebShareAPI();

  const downloadByAnchor = async (blob: Blob, fileName: string) => {
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

  const saveImage = async (blob: Blob, fileName: string) => {
    try {
      validateCanWebShare();

      const file = new File([blob], 'qrcode.png', { type: 'image/png' });
      await share({
        files: [file],
        title: '스페이스 QR',
      });
    } catch {
      downloadByAnchor(blob, fileName);
    }
  };

  return { saveImage };
};

export default useImageDownload;
