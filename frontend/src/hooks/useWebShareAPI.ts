interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}

const useWebShareAPI = () => {
  const handleWebShare = async ({ title, text, url, files }: ShareOptions) => {
    if (!navigator.canShare) {
      console.warn('Web Share API를 지원하지 않습니다.');
      return false;
    }

    if (files && !navigator.canShare({ files })) {
      console.warn('파일 중 공유를 할 수 없는 파일이 있습니다.');
      return false;
    }

    // TODO: tryTask로 변환
    try {
      await navigator.share({ title, text, url, files });
      return true;
    } catch (err) {
      console.error('공유 취소 또는 오류:', err);
      return false;
    }
  };

  return { handleWebShare };
};

export default useWebShareAPI;
