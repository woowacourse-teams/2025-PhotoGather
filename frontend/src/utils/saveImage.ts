import { validateCanWebShare } from '../validators/share.validators';
import { shareByWebShareAPI } from './webShareApi';

export const downloadByAnchor = async (blob: Blob, fileName: string) => {
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

export const saveImage = async (blob: Blob, fileName: string) => {
  try {
    validateCanWebShare();

    const file = new File([blob], fileName, { type: blob.type });
    await shareByWebShareAPI({
      files: [file],
      title: fileName,
    });
  } catch (error) {
    if (error instanceof Error && error.name !== 'AbortError') {
      downloadByAnchor(blob, fileName);
    }
  }
};
