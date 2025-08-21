import { useEffect } from 'react';
import useError from '../../hooks/@common/useError';
import useKakaoAuth from '../../hooks/domain/useKakaoAuth';

const KakaoAuthPage = () => {
  const { tryFetch } = useError();
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
    });
  }, [getAuth, tryFetch]);

  return null;
};

export default KakaoAuthPage;
