import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const useKakaoRedirect = () => {
  const navigate = useNavigate();

  //biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 접속 시 처음 한 번만 실행
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isKakaoBrowser = userAgent.includes('kakaotalk');

    if (isKakaoBrowser) {
      navigate(ROUTES.OPEN_BROWSER);
    }
  }, []);
};

export default useKakaoRedirect;
