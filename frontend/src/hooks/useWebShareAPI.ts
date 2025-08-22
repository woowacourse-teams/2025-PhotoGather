import {
  validateCanShareFile,
  validateCanWebShare,
} from '../validators/share.validator';
import useError from './@common/useError';

interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

const useWebShareAPI = () => {
  const { tryFetch } = useError();

  const share = async ({ title, text, url, files }: ShareOptions) => {
    await tryFetch({
      task: async () => {
        validateCanWebShare();
        validateCanShareFile(files);
        await navigator.share({ title, text, url, files });
      },
      errorActions: ['console'],
    });
  };

  return { share };
};

export default useWebShareAPI;
