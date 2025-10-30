import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useToast } from '../../hooks/@common/useToast';
import useKakaoAuth from '../../hooks/domain/auth/useKakaoAuth';

const KakaoAuthPage = () => {
  const { getServerToken } = useKakaoAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const getKakaoCode = () => {
    const params = new URLSearchParams(window.location.search);
    const kakaoCode = params.get('code');

    if (!kakaoCode) {
      throw new Error('카카오 인가코드 발급 실패');
    }

    return kakaoCode;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: getKakaoCode는 의존성 배열에 포함되지 않음
  useEffect(() => {
    const fetchKakaoCode = async () => {
      try {
        const kakaoCode = getKakaoCode();
        await getServerToken(kakaoCode);
        navigate(ROUTES.HOST.MAIN);
      } catch (error) {
        console.error(error);
        showToast({
          text: '로그인에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        });
        navigate(ROUTES.LANDING);
      }
    };
    fetchKakaoCode();
  }, []);

  return null;
};

export default KakaoAuthPage;
