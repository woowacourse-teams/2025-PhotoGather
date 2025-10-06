import { useToast } from './useToast';

interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

const useWebShareAPI = () => {
  const { showToast } = useToast();

  const share = async ({ title, text, url, files }: ShareOptions) => {
    try {
      await navigator.share({ title, text, url, files });
    } catch (error) {
      showToast({
        text: '공유 도중 오류가 발생했습니다.',
        type: 'error',
      });
      console.error(error);
    }
  };

  return { share };
};

export default useWebShareAPI;
