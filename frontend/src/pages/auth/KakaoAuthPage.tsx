import { useEffect } from 'react';
import useTaskHandler from '../../hooks/@common/useTaskHandler';
import useKakaoAuth from '../../hooks/domain/useKakaoAuth';

const KakaoAuthPage = () => {
  const { tryFetch } = useTaskHandler();
  const { getAuth } = useKakaoAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) return;

    tryFetch({
      task: async () => {
        await getAuth(code);
      },
      errorActions: ['toast'],
      loadingStateKey: 'kakaoAuth',
    });
  }, [getAuth, tryFetch]);

  return null;
};

export default KakaoAuthPage;
